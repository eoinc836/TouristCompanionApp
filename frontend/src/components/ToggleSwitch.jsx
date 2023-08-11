import React from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
  border: 1px solid #666666; 
  border-radius: 20px; 
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  background-color: ${(props) => (props.isOn ? '#666666' : '#ccc')};
  border-radius: 20px;
  transition: 0.4s;
`;

const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  width: 0;
  height: 0;
  opacity: 0;
`;

const ModeIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 3px;
  display: flex;

  img {
    width: 16px;
    height: 16px;
    opacity: ${(props) => (props.darkMode ? 0.5 : 1)};
  }

  &:last-child {
    left: auto;
    right: 3px;

    img {
      opacity: ${(props) => (props.darkMode ? 1 : 0.5)};
    }
  }
`;

const ModeText = styled.div`
  color: ${(props) => (props.darkMode ? '#ffffff' : '#000000')};
`;

const ToggleSwitch = ({ darkMode, onToggle }) => {
  
  return (
    <>
      <SwitchContainer>
        <HiddenInput checked={darkMode} onChange={onToggle} />
        <Slider isOn={darkMode} />
        <ModeIcon darkMode={darkMode}>
          <img src={require('../assets/FiSun.png')} alt="Sun" />
        </ModeIcon>
        <ModeIcon darkMode={darkMode}>
          <img src={require('../assets/FiMoon.png')} alt="Moon" />
        </ModeIcon>
      </SwitchContainer>
      <ModeText darkMode={darkMode} style={{ fontFamily: 'Segoe UI', color: '#808080' }}>
  {darkMode ? 'Dark' : 'Light'}
</ModeText>
    </>
  );
};

export default ToggleSwitch;
