import { MenBodySvgComponent } from './MenBodySvgComponent.tsx';
import { MenBackBodySvgComponent } from './MenBodyBackSvgComponent.tsx';
import './body.css';
import React, { useEffect } from 'react';

const SELECTED_CLASS = 'sc-body-model-svg__path--selected';

type Props = {
  locations: string[];
  setLocations: (locations: string[]) => void;
};

export const BodySelect = ({ locations, setLocations }: Props) => {
  const onClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.target instanceof SVGPathElement && e.target.id) {
      const id = e.target.id;
      if (locations.includes(id)) {
        setLocations(locations.filter((loc) => loc !== id));
        document.getElementById(id)?.classList.remove(SELECTED_CLASS);
      } else {
        setLocations([...locations, id]);
        document.getElementById(id)?.classList.add(SELECTED_CLASS);
      }
    }
  };

  useEffect(() => {
    locations.forEach((loc) => {
      const path = document.getElementById(loc);
      if (path) {
        path.classList.add(SELECTED_CLASS);
      }
    });
  }, [locations]);

  return (
    <div className="flex flex-col md:flex-row max-h-[900px] md:max-h-[450px] max-w-[600px] justify-center">
      <MenBodySvgComponent onClick={onClick} />
      <MenBackBodySvgComponent onClick={onClick} />
    </div>
  );
};
