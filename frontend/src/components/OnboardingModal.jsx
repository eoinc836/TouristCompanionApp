import React, {useState, useRef, useEffect} from "react";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";


const OnboardingModal = ({ show, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const mapRef = useRef(null);
    const searchBarRef = useRef(null);
    const calendarRef = useRef(null);
    const filterRef = useRef(null);
    const searchButtonRef = useRef(null);
    const geoButtonRef = useRef(null);
    const routingButtonRef = useRef(null);

    const onboardingSteps = [
        {
            content: "Step 1: This is the Map page! Here you can search for places to visit and view place busyness"
            ,targetRef: mapRef
        },
        {
            content: "Step 2: This is the search bar. Enter your destination if known to check for busyness"
            ,targetRef: searchBarRef
        },
        {
            content:"Step 3: This is the Busyness Forecast calendar. Input the date & time to view busyness"
            ,targetRef: calendarRef
        },
        {
            content:"Step 4: Unsure of where to go? Click here to view categories and busyness level preferences"
            ,targetRef: filterRef
        },
        {
            content:"Step 5: Click here to search for places to visit"
            ,targetRef: searchButtonRef
        },
        {
            content:"Step 6: Click here to find where you are on the map"
            ,targetRef: geoButtonRef
        },
        {
            content:"Step 7: Click here to find directions from your location to your destination"
            ,targetRef: routingButtonRef
        },
        {
            content:"Step 8: This is the Itinerary generator. Use this feature to plan your visit most efficiently!"
        },
    ];

    const applyHighlight = (ref) => {
        if (ref.current){
            ref.current.classList.add("highlighted");
        }
    };
    const removeHighlight = (ref) => {
        if (ref.current){
            ref.current.classList.remove("highlighted");
        }
    };

    const handleNextStep = () => {
        if (currentStep < onboardingSteps.length - 1){
            removeHighlight(onboardingSteps[currentStep].targetRef);
            setCurrentStep(prevState => prevState + 1);
            applyHighlight(onboardingSteps[currentStep + 1].targetRef);
        }
        else{
            removeHighlight(onboardingSteps[currentStep].targetRef);
            onClose();
        }
    };

    useEffect(() =>{
        if(show){
            applyHighlight(onboardingSteps[0].targetRef)
        }
    }, [show]);

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Welcome to BusyBuddy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{onboardingSteps[currentStep].content}</p>
      </Modal.Body>
      <Modal.Footer>
        {currentStep < onboardingSteps.length - 1 ? (
          <Button variant="primary" onClick={handleNextStep}>
            Next
          </Button>
        ) : (
          <Button variant="primary" onClick={onClose}>
            Got it!
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default OnboardingModal;