import { MenBodySvgComponent } from './MenBodySvgComponent.tsx';
import { MenBackBodySvgComponent } from './MenBodyBackSvgComponent.tsx';
import './body.css';

export const BodySelect = () => (
  <div className="flex flex-col md:flex-row max-h-[900px] md:max-h-[450px] max-w-[600px] justify-center">
    <MenBodySvgComponent />
    <MenBackBodySvgComponent />
  </div>
);
