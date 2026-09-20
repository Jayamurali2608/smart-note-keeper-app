import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllNotes from "./pages/AllNotes";
import Tags from "./pages/Tags";
import Trash from "./pages/Trash";
import NotebookView from "./pages/NotebookView";
import Settings from "./pages/Settings";
import NoteDetail from "./components/NoteDetail";
import Archive from "./pages/Archive";
import Profile from "./pages/profile";
import NoteEditor from "./components/NoteEditor";

function App() {
  useEffect(()=>{
    const savedTheme=localStorage.getItem("theme")||"light";
    document.documentElement.setAttribute("data-theme",savedTheme);
  },[]);
  return (
    <BrowserRouter basename="/smart-note-keeper-app">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notes" element={<AllNotes />} />
        <Route path="/editor" element={<NoteEditor />} />
        <Route path="/note/:id" element={<NoteDetail />} />
        <Route path="/Tags" element={<Tags />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/notebook" element={<NotebookView />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;