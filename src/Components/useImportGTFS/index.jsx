// useImportGTFS.js
import { useCallback, useState } from "react";
import JSZip from "jszip";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import * as XLSX from "xlsx"; // Import XLSX module

const collectionsMap = {
  "agency2.xlsx": "agency2",
  "calendar2.xlsx": "calendar2",
  "calendar_dates2.xlsx": "calendar_dates2",
  "created_agencies.xlsx": "created_agencies",
  "routes.xlsx": "routes",
  "routes2.xlsx": "routes2",
  "shapes2.xlsx": "shapes2",
  "stop_times2.xlsx": "stop_times2",
  "stops2.xlsx": "stops2",
  "trips2.xlsx": "trips2",
  "trips1.xlsx": "trips1",
};

const useImportGTFS = () => {
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const uploadToFirestore = async (collectionName, data) => {
    const collectionRef = collection(db, collectionName);
    for (const item of data) {
      await addDoc(collectionRef, item);
    }
  };

  const handleImport = useCallback(async (file) => {
    try {
      setShowModal(true);

      const zip = new JSZip();
      const loadedZip = await zip.loadAsync(file);
      const totalFiles = Object.keys(loadedZip.files).length;
      let processedFiles = 0;

      for (const fileName in loadedZip.files) {
        const collectionName = collectionsMap[fileName];
        if (collectionName) {
          const fileData = await loadedZip.files[fileName].async("arraybuffer");
          const workbook = await XLSX.read(fileData, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          await uploadToFirestore(collectionName, jsonData);
        }

        processedFiles += 1;
        const progressPercentage = (processedFiles / totalFiles) * 100;
        setProgress(progressPercentage);
      }

      setShowModal(false);
      alert("GTFS data imported successfully!");
    } catch (error) {
      setShowModal(false);
      console.error("Error importing GTFS data:", error);
      alert(
        "Failed to import GTFS data. Please check the console for details.",
      );
    }
  }, []);

  return { handleImport, progress, showModal };
};

export default useImportGTFS;
