import React, { useState, useEffect } from "react";
import { Intro, Steps } from "intro.js-react";
import "intro.js/introjs.css";

const OnboardingModal = ({ show, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const mapRef = React.createRef();
  const searchBarRef = React.createRef();
  const calendarRef = React.createRef();
  const filterRef = React.createRef();
  const searchButtonRef = React.createRef();
  const geoButtonRef = React.createRef();
  const routingButtonRef = React.createRef();

  const onboardingSteps = [
    {
      target: mapRef.current,
      title: "Step 1: Map Page",
      content: "This is the Map page! Here you can search for places to visit and view place busyness",
    },
    {
      target: searchBarRef.current,
      title: "Step 2: Search Bar",
      content: "This is the search bar. Enter your destination if known to check for busyness",
    },
    {
      target: calendarRef.current,
      title: "Step 3: Busyness Forecast",
      content: "This is the Busyness Forecast calendar. Input the date & time to view busyness",
    },
    {
      target: filterRef.current,
      title: "Step 4: Filters",
      content: "Step 4: Unsure of where to go? Click here to view categories and busyness level preferences",
    },
    {
      target: searchButtonRef.current,
      title: "Step 5: Search",
      content: "Step 5: Click here to search for places to visit",
    },
    {
      target: geoButtonRef.current,
      title: "Step 6: Find yourself",
      content: "Step 6: Click here to find where you are on the map",
    },
    {
      target: routingButtonRef.current,
      title: "Step 7: Routing",
      content: "Step 7: Click here to find directions from your location to your destination",
    },
    {
      target: kwargs,
      title: "Step 8: Itinerary",
      content: "Step 8: This is the Itinerary generator. Use this feature to plan your visit most efficiently!",
    },
  ];

  useEffect(() => {
    if (show) {
      showOnboardingGuide();
    }
  }, [show]);

  const showOnboardingGuide = () => {
    IntroJs().setOptions({
      steps: onboardingSteps,
      showBullets: true,
      tooltipClass: "custom-tooltip",
    }).start();
  };

  const applyHighlight = (ref) => {
    if (ref && ref.current) {
      ref.current.classList.add("highlighted");
    }
  };

  const removeHighlight = (ref) => {
    if (ref && ref.current) {
      ref.current.classList.remove("highlighted");
    }
  };

  const handleNextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      removeHighlight(onboardingSteps[currentStep].target);
      setCurrentStep((prevState) => prevState + 1);
      applyHighlight(onboardingSteps[currentStep + 1].target);
    } else {
      removeHighlight(onboardingSteps[currentStep].target);
      onClose();
    }
  };

  return (
    <div>
      <Intro initialStep={0} onExit={onClose}>
        <Steps>
          {onboardingSteps.map((step, index) => (
            <div key={index} data-step={index} data-intro={step.content} data-tooltipClass="custom-tooltip">
              {/* You can put any element here that you want to be the target */}
              <span className="target-element" ref={step.target} />
            </div>
          ))}
        </Steps>
      </Intro>

      {/* The rest of your Modal component code here */}
    </div>
  );
};

export default OnboardingModal;
