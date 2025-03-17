import { useEffect, useState } from 'react';
import './MainPage.css';
function MainPage({ children }) {

    const [className, setClassName] = useState("background-page");
    useEffect(() => {    // Update the document title using the browser API    
        if (document.getElementById("home_page") != null) {
            setClassName("home_page");
        }
        else {
            setClassName("background-page");
        }
    }, [children]); // des que la page est modifiee, on change le fond
    return (
        <>
            <div className={className == "home_page" ? "particle-container" : ""}>
                {className == "home_page" &&
                    <div className="particles"><span className="circle"></span><span className="circle 1"></span><span className="circle 2"></span><span className="circle 3"></span><span className="circle 4"></span><span className="circle 5"></span><span className="circle 6"></span><span className="circle 7"></span><span className="circle 8"></span><span className="circle 9"></span><span className="circle 10"></span><span className="circle 11"></span><span className="circle 12"></span><span className="circle 13"></span><span className="circle 14"></span><span className="circle 15"></span><span className="circle 16"></span><span className="circle 17"></span><span className="circle 18"></span><span className="circle 19"></span><span className="circle 20"></span><span className="circle 21"></span><span className="circle 22"></span><span className="circle 23"></span><span className="circle 24"></span><span className="circle 25"></span><span className="circle 26"></span><span className="circle 27"></span><span className="circle 28"></span><span className="circle 29"></span></div>

                }
            </div>
            <div id="main_page" className={className}>




                {children}
            </div>
        </>

    );

}
export default MainPage;