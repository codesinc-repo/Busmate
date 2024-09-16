// useExportGTFS.js
import { useCallback } from "react";
import * as XLSX from "xlsx";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

const collections = [
  "agency2",
  "calendar2",
  "calendar_dates2",
  "created_agencies",
  "routes",
  "routes2",
  "shapes2",
  "stop_times2",
  "stops2",
  "trips2",
  "trips1",
];

const useExportGTFS = () => {
  const fetchCollectionData = async (collectionName) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return data;
    } catch (error) {
      console.error(`Failed to fetch ${collectionName}:`, error);
      return [];
    }
  };

  const exportToExcel = (data, sheetName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    return new Blob([excelBuffer], { type: "application/octet-stream" });
  };

  const handleExport = useCallback(async () => {
    const zip = new JSZip();

    for (const collection of collections) {
      const data = await fetchCollectionData(collection);
      const excelBlob = exportToExcel(data, collection);
      zip.file(`${collection}.xlsx`, excelBlob);
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "gtfs_data.zip");
    });
  }, []);

  return { handleExport };
};

export default useExportGTFS;
