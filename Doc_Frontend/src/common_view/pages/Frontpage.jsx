import Front from "../components/front";
import Header from "../components/Logo _title";
import FootSection from "../components/footer";
import Front_nav from "../components/front_navbar";
function Frontpage(){
     return(
        <div>
          <Header/>
          <Front_nav/>
          <Front/>
          <FootSection/>
        </div>
     )
}
export default Frontpage;