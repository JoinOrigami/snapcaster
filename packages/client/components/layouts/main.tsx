import Navbar from "@components/navbar";

function Layout({ children }) {
  return (
    <div className="container py-8">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
