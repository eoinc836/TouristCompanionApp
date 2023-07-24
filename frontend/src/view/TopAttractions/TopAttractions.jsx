import React from 'react'; 
import "./TopAttractions.scss"; 
import 'bootstrap/dist/css/bootstrap.min.css';
const TopAttractions = () => (
    <div className="container">
        <div className="row">
            <div className="col-md-6 mb-4">
                <div className="card position-relative">
                    <img src={require("../../assets/brooklynbridge.jpg")} className="card-img-top" alt="Image 1" />
                    <div className="card-img-overlay">
                        <h5 className="card-title text-white">Brooklyn Bridge</h5>
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
                    <div className="card-img-overlay d-flex align-items-center justify-content-center">
                        <h5 className="card-title text-white">Central Park</h5>
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
                    <div className="card-img-overlay d-flex align-items-center justify-content-center">
                        <h5 className="card-title text-white">The Empire State Building</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                        The Empire State Building, was the world's tallest skyscraper when it was finished in 1931. Its observatories give panoramic views of the city.
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 mb-4">
            <div className="section">
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
    <li>Jaywalking, crossing the street outside designated crosswalks or against traffic signals, is illegal in New York City. Always use marked crosswalks and obey traffic signals for your safety.</li>
    </ul>
  </div>
            </div>
        </div>
    
        <div className="row">
            <div className="col-md-4 mb-4">
                <div className="card position-relative">
                    <img src={require("../../assets/metropolitonart.jpg")} className="card-img-top" alt="Image 1" />
                    <div className="card-img-overlay d-flex align-items-center justify-content-center">
                        <h5 className="card-title text-white">The Metropolitan Museum of Art</h5>
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
                    <div className="card-img-overlay d-flex align-items-center justify-content-center">
                        <h5 className="card-title text-white">The Statue of Liberty</h5>
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
                    <div className="card-img-overlay d-flex align-items-center justify-content-center">
                        <h5 className="card-title text-white">The High Line</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                        The High Line is a remarkable elevated park on Manhattan's West Side. It has a picturesque walking trail with flora, art, and city views. It's popular among locals and tourists.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4 mb-4">
                <div className="card position-relative">
                    <img src={require("../../assets/wallstreet.jpg")} className="card-img-top" alt="Image 1" />
                    <div className="card-img-overlay d-flex align-items-center justify-content-center">
                        <h5 className="card-title text-white">Wall Street</h5>
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
                    <div className="card-img-overlay d-flex align-items-center justify-content-center">
                        <h5 className="card-title text-white">Times Square</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                        Times Square's nickname also known as "The Crossroads of the World." Famous for its colorful neon billboards, Broadway theaters, and lively ambiance, it's a significant business crossroads and entertainment area. Every New Year's Eve, Times Square hosts the ball drop.

                        </p>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="card position-relative">
                    <img src={require("../../assets/broadway.jpg")} className="card-img-top" alt="Image 1" />
                    <div className="card-img-overlay d-flex align-items-center justify-content-center">
                        <h5 className="card-title text-white">Broadway</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                        Broadway is known for its lively theater culture. It has many theaters showing musicals, plays, and performances. Broadway shows attract theater
                            enthusiasts from around the world.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
); 

export default TopAttractions;
    