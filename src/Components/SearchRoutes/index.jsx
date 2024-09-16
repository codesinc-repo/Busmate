import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { toast } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Form } from "react-bootstrap";

const SearchRoutes = ({ userId, onSelectRoute }) => {
  const [routes, setRoutes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchRoutes(user.uid);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const fetchRoutes = async (userId) => {
    try {
      const RoutesRef = collection(db, "agencies_routes_data");
      const q = query(RoutesRef, where("userId", "==", userId));
      const snapshot = await getDocs(q);
      const routesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRoutes(routesData);
    } catch (error) {
      console.error("Error fetching routes:", error);
      toast.error("Error fetching routes: ", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchRoutes(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = routes.filter(
        (route) =>
          route.routeLongName &&
          route.routeLongName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredRoutes(filtered);
    } else {
      setFilteredRoutes([]);
    }
  }, [searchTerm, routes]);

  const handleSelectRoute = (route) => {
    setSearchTerm(route.routeLongName);
    setFilteredRoutes([]);
    onSelectRoute(route);
  };

  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Search routes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-2"
      />
      {filteredRoutes.length > 0 && (
        <ul className="suggestions">
          {filteredRoutes.map((route) => (
            <li key={route.id} onClick={() => handleSelectRoute(route)}>
              {route.routeLongName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchRoutes;
