
import React, { useEffect } from 'react';
import "./TopAttractions.scss"; 
import 'bootstrap/dist/css/bootstrap.min.css';
const TopAttractions = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "#2b3345";

        // Revert back to the original style when the component is unmounted
        return () => {
            document.body.style.backgroundColor = null;
        };
    }, []);

    return (
<div className="container" style={{ backgroundColor: "#2b3345" }}>

        <div className="row">
            <div className="col-md-6 mb-4">
                <div className="card position-relative">
                    <img src={require("../../assets/brooklynbridge.jpg")} className="card-img-top" alt="Image 1" />
                    <div className="card-img-overlay d-flex justify-content-center custom-title-position">
                    <h5 className="card-title custom-title-bg text-white">Brooklyn Bridge</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                        The Brooklyn Bridge offers breathtaking views of the New York City skyline and is a popular spot for walking, cycling, and photography.
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 mb-4">
                <div className="card position-relative">
                    <img src={require("../../assets/centralpark.jpg")} className="card-img-top" alt="Image 1" />
                    <div className="card-img-overlay d-flex justify-content-center custom-title-position">
                    <h5 className="card-title custom-title-bg text-white">Central Park</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                        Manhattan's Central Park is a popular urban park. Lakes, meadows, bridges, and a zoo cover 843 acres. Many movies and TV shows have featured it.
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 mb-4">
                <div className="card position-relative">
                    <img src={require("../../assets/empirestatebuilding.jpg")} className="card-img-top" alt="Image 2" />
                    <div className="card-img-overlay d-flex justify-content-center custom-title-position">

                    <h5 className="card-title custom-title-bg text-white">The Empire State Building</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                        The Empire State Building, was the world's tallest skyscraper when it was finished in 1931. Its observatories give panoramic views of the city.
                        </p>
                    </div>
                </div>
            </div>
           <div className="col-md-6 mb-4">
    <div className="section info-text">  {/* Added the info-text class here */}
    
        <h2>Things to Know Before Traveling</h2>
        <ul className="custom-list">
    <li>Up to 800 languages are spoken in New York City, making it the most linguistically diverse city in the world.</li>
    <li>Pedestrians have the right of way at crosswalks, even if there is no traffic signal. Drivers are legally required to yield to pedestrians crossing the street.</li>
    <li>New York City was originally named New Amsterdam.</li>
    <li>New York City's iconic taxis were originally red and green.</li>
    <li>It is illegal to honk your car horn in New York City.</li>
    <li>Large backpacks and bags may be subject to security checks at popular attractions, museums, and stadiums. It's recommended to travel with smaller bags or check specific rules for each venue before visiting.</li>
    <li>It is illegal to drink alcoholic beverages in public places, such as streets, parks, and subways. </li>
    <li>New York has the largest US national park outside of Alaska.</li>
    <li>If you're aiming to explore numerous attractions in NYC while also saving money, exploring options like the NYC Sightseeing Pass, NYC CityPASS, and GoCity PASS might be beneficial.</li>
    
    </ul>
  </div>
            </div>
        </div>
    
        <div className="row">
            <div className="col-md-4 mb-4">
                <div className="card position-relative">
                    <img src={require("../../assets/metropolitonart.jpg")} className="card-img-top" alt="Image 1" />
                    <div className="card-img-overlay d-flex justify-content-center custom-title-position">
                    <h5 className="card-title custom-title-bg text-white">The Metropolitan Museum of Art</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                        The Metropolitan Museum of Art, is a famous art museum. It has a massive collection from several civilizations. The Met's collection includes ancient Egyptian antiquities and modern art.

                        </p>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="card position-relative">
                    <img src={require("../../assets/statueofliberty.jpg")} className="card-img-top" alt="Image 1" />
                    <div className="card-img-overlay d-flex justify-content-center custom-title-position">
                    <h5 className="card-title custom-title-bg text-white">The Statue of Liberty</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                        The Statue of Liberty, one of New York's most famous landmarks, was a gift from France. On October 28, 1886, it was dedicated as a symbol of democracy and freedom. 

                        </p>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="card position-relative">
                    <img src={require("../../assets/highline.jpg")} className="card-img-top" alt="Image 2" />
                    <div className="card-img-overlay d-flex justify-content-center custom-title-position">
                    <h5 className="card-title custom-title-bg text-white">The High Line</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                        On the West Side of Manhattan, there lies a magnificent elevated park called The High Line. It offers a serene escape above the bustling streets of Manhattan, inviting visitors to immerse themselves in a tranquil oasis where urban beauty, creativity, and nature seamlessly blend together.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4 mb-4">
                <div className="card position-relative">
                    <img src={require("../../assets/wallstreet.jpg")} className="card-img-top" alt="Image 1" />
                     <div className="card-img-overlay d-flex justify-content-center custom-title-position">
                     <h5 className="card-title custom-title-bg text-white">Wall Street</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                        American finance is associated with Wall Street in Lower Manhattan's Financial District. The New York Stock Exchange and other financial organizations are there. Wall Street is also home to the Charging Bull statue.
                        </p>
                    </div>
                </div>
            </div>
    
            <div className="col-md-4 mb-4">
                <div className="card position-relative">
                    <img src={require("../../assets/timessquare.jpg")} className="card-img-top" alt="Image 2" />
                    <div className="card-img-overlay d-flex justify-content-center custom-title-position">
                    <h5 className="card-title custom-title-bg text-white">Times Square</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                        Times Square's nickname also known as "The Crossroads of the World." Famous for its colorful neon billboards, Broadway theaters, and lively ambiance, it's a significant business crossroads and entertainment area. 

                        </p>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="card position-relative">
                    <img src={require("../../assets/broadway.jpg")} className="card-img-top" alt="Image 1" />
                    <div className="card-img-overlay d-flex justify-content-center custom-title-position">
                    <h5 className="card-title custom-title-bg text-white">Broadway</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                        Broadway is renowned for its vibrant and bustling theater culture. The iconic district is home to numerous theaters that host an array of captivating musicals, gripping plays, and mesmerizing live performances. The allure of Broadway's theatrical productions, drawing theater enthusiasts from every corner of the globe.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
); }

export default TopAttractions;
    