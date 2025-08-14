import './App.css'
import {Route, Routes, useNavigate} from "react-router-dom";
import ToDoPage from "./pages/ToDoPages.tsx";
import ToDoForm from "./pages/ToDoForm.tsx";

function App() {
    const nav = useNavigate()

    function handleNaviOpen(){
        nav("/open")

    }
    function handleNaviProgress(){
        nav("/progress")

    }
    function handleNaviDone(){
        nav("/done")
    }
    function handleNaviHome(){
        nav("/")
    }

  return (
    <>
        <header className="App-header"><title>Recap project Frontend ToDo</title></header>
        <div className="navi-app">
            <button onClick={handleNaviHome}>Create ToDo</button>
            <button onClick={handleNaviOpen}>Open</button>
            <button onClick={handleNaviProgress}>In Progress</button>
            <button onClick={handleNaviDone}>Done</button>
        </div>
        <Routes>
            <Route path="/" element={<ToDoForm/>} />
            <Route path="/:id/update" element={<ToDoForm />} />
            <Route path="/open" element={<ToDoPage status="OPEN" />} />
            <Route path="/progress" element={<ToDoPage status="IN_PROGRESS" />} />
            <Route path="/done" element={<ToDoPage status="DONE"/>} />
        </Routes>

    </>
  )
}

export default App
