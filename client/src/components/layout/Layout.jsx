import React from 'react';
import Footer from './Footer';
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {/* <h1>Something</h1> */}
      <div className="content">
        {children}
      </div>
      <Footer />

    </>
  )
}

export default Layout