import FootSection from "../components/footer";
import Header from "../components/Logo _title";
import Nav_bar_1 from "../../Admin_view/components/ad_nav_bar";
import Nav_bar_2 from "../../Doctor_view/components/doc_nav_bar";
import Nav_bar_3 from "../../PatientView/Components/Pa_nav_bar";
import Nav_bar_4 from "../../staff_view/components/st_nav_bar";
import Front_nav from "../components/front_navbar";
import React ,{useEffect,useState} from 'react';
import "./home.css";

function Home(){
    const role=localStorage.getItem("user_type");
    const renderNavBar=()=>{
       switch (role){
        case "Admin":
            return<Nav_bar_1/>;
        case "Doctor":
            return<Nav_bar_2/>;
        case "Staff":
            return<Nav_bar_4/>;
        case "Patient":
            return <Nav_bar_3/>;
        default:
            return <Front_nav/>;
       }
    }
    const ImageView =()=>{
        const images=['/Doc_7.webp','/Doc_3.jpg','/Doc_6.webp','/Doc_8.jpeg'];
        const [currentImage,setCurrentImage]=useState(0);
        useEffect(()=>{
            const timer=setInterval(()=>{
                setCurrentImage((prevImage)=> (prevImage +1)% images.length);
            },2000);
        return ()=>clearInterval(timer);
        },[]);
        return (
            <div className="main_bar">
                <div className="mission">
                    <h4>Our Mission</h4>
                    <div className="mission-content">
                    Our mission is to provide a convienient, reliable, and patient-friendly platform to scheduling doctor appointments and medical tests at one centralized location. 
                    We aim to enhance healthcare accessibility by streamlining the booking process, ensuring timely medical care and promoting a smooth experience for every user.
                    </div>
                </div>
                <img className="slides"src={images[currentImage]} alt={'Slide ${currentImage +1}'} style={{width:'1000px',height:'500px',transition:'opacity 1s'}}/>
            </div>
        );
    }
   return(
    <div>
        <Header/>
           {renderNavBar()}
           <main style={{flex:1,padding:'20px'}}>
             {ImageView()}
           </main>
        <FootSection/>
    </div>
   )
};
export default Home;