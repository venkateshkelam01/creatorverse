import { useRoutes, Link } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";

function App() {
  const routes = useRoutes([
    { path: "/", element: <ShowCreators /> },
    { path: "/creator/:id", element: <ViewCreator /> },
    { path: "/add", element: <AddCreator /> },
    { path: "/edit/:id", element: <EditCreator /> },
  ]);

  return (
    <div className="app">
      <nav className="nav">
        <div className="brand">
          <span className="brand-badge" />
          Creatorverse
        </div>
        <div className="row">
          <Link to="/" className="link">Home</Link>
          <Link to="/add" className="btn">Add Creator</Link>
        </div>
      </nav>
      {routes}
    </div>
  );
}
export default App;
