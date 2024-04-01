import React,{useState,useEffect} from 'react'
import Header from "../components/Layout/Header"
import Footer from "../components/Layout/Footer"
import Dialog from "../components/Dialog/Dialog"
const MainLayout = ({children}) => {
  const [isDialogShow,setIsDialogShow] = useState(false);
  const dialogStatus = localStorage.getItem('dialog') ? JSON.parse(localStorage.getItem('dialog')) : localStorage.setItem('dialog', JSON.stringify(true));
  useEffect(() => {
     setTimeout(() => {
      setIsDialogShow(dialogStatus);
     } , 3000)
  }, [
      dialogStatus
  ]);

    // Modal dışına tıklanınca modalı kapat
    const handleOverlayClick = () => {
      setIsDialogShow(false);
    };





  return (
    <div>
        <Dialog isDialogShow={isDialogShow} setIsDialogShow={setIsDialogShow} handleOverlayClick={handleOverlayClick} />
        <Header />
        {children}
        <Footer />
    </div>
  )
}

export default MainLayout