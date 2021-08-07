import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

//Devuelve el contexto que es una pagina y contiene el user
export default () => useContext(AuthContext);
