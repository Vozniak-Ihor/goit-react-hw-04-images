import css from './Loader.module.css';
import { Triangle } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className={css.loader}>
      <Triangle
        height="120"
        width="120"
        color="#3f51b5"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};
