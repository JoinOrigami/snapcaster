import Navbar from "@components/navbar";

function Layout({ children }) {
  return (
    <div className="py-6">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
