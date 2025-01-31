import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    console.log("admin Layout .........")
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-8">{children}</main>
    </div>
  );
};

export default Layout;
