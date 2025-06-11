import React, { useEffect, useRef, useState } from 'react';
import Segundero from './Segundero';

const Aplicacion = () => {
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const [isCountdown, setIsCountdown] = useState(false);
  const [initialTime, setInitialTime] = useState(0);
  const [alertTime, setAlertTime] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setCounter(prev => {
          const next = isCountdown ? prev - 1 : prev + 1;
          if (alertTime !== null && next === alertTime) {
            alert(`¡Has llegado al tiempo de alerta: ${alertTime} segundos!`);
          }
          if (isCountdown && next <= 0) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, isCountdown, alertTime]);

  const iniciar = () => {
    setIsRunning(true);
  };

  const pausar = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const reiniciar = () => {
    setInitialTime(0);
    setIsCountdown(false);
    setAlertTime(null);
    document.querySelector('#inputTiempoInicial').value="";
    document.querySelector('#inputTiempoAlerta').value="";
    clearInterval(timerRef.current);
    setIsRunning(false);
    setCounter(0);
  };

  const manejarTiempoInicial = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setCounter(value);
      setInitialTime(value);
      setIsCountdown(true);
    }
  };

  const manejarTiempoAlerta = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setAlertTime(value);
    }
  };

  return (
    <div className="container text-center mt-5">
      <Segundero seconds={counter} />
      <div className="my-3">
        <input className="form-control mb-2" id="inputTiempoInicial" type="number" placeholder="Tiempo de cuenta regresiva" onBlur={manejarTiempoInicial}/>
        <button className="btn btn-success me-2" onClick={iniciar} disabled={isRunning}> Iniciar </button>
        <button className="btn btn-warning me-2" onClick={pausar}> Pausar </button>
        <button className="btn btn-danger my-2" onClick={reiniciar}> Reiniciar </button>
        <input className="form-control mb-2" id="inputTiempoAlerta" type="number" placeholder="Tiempo para alerta" onBlur={manejarTiempoAlerta} />
      </div>
    </div>
  );
};
export default Aplicacion;
