import React from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Drawer from './Drawer'
import FontIcon from 'material-ui/FontIcon'
import Dialog from './Dialog'

const AppBarExampleIconButton = (props) => {
  return (
    <div>
      <AppBar
        title="Diathymia"
        titleStyle={{textAlign: 'center'}}
        style={{background: 'rgb(20, 88, 159)'}}
        iconStyleRight={{margin:'5px 5px 0 0'}}
        onLeftIconButtonTouchTap ={() => props.toggleDrawer()}
        onRightIconButtonTouchTap ={() => props.toggleDialog()}
        iconElementRight={
            <Avatar
              icon={props.loggedIn ? null : <FontIcon  style={{color:'rgba(182, 198, 247, 0.62)'}}className='fa fa-user' />}
              src={props.loggedIn ? `images/${props.hero}.png` : null}
              style ={{background:'rgba(245, 245, 245, 0.29)', textAlign:'center', marginTop:'5px', cursor: 'pointer'}}
            />
        }
      />
      <Drawer />
      <Dialog/>
    </div>
  );
}
export default AppBarExampleIconButton;
