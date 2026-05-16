import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Helmet} from "react-helmet";
import {Toaster} from 'react-hot-toast'
import FloatingCartButton from "../../pages/FloatingCartButton";
import FloatingHomeButton from "../../pages/FloatingHomeButton";
const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
                <meta charSet="utf-8" />
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content={author} />
  <title>{title}</title>
      </Helmet>
      <Header/>
      <main style={{minHeight:'70vh'}}>
      <Toaster />
      {children}
      </main>
      <FloatingCartButton />
      <FloatingHomeButton />
      <Footer/>
    </div>
  );
};
Layout.defaultProps={
  title:'jms-ecommerce',
  description:'name of maximum project',
  keywords:'online,shop,product',
  author:'tony'
}
export default Layout;
