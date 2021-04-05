import React from 'react';
import { Button } from 'semantic-ui-react';

import './index.scss';

const ButtonComponent = ({children, ...rest}) => {
    return (
        <Button className={'add-button'} {...rest}>{children}</Button>
    );
};

export default ButtonComponent