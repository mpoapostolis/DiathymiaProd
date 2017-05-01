import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Home from './heroIm'
import Shop from './shop'
const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class BottomNavigationExampleSimple extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  whatRender(){
    const { selectedIndex } = this.state
    switch (selectedIndex) {
      case 0:
        return <Home/>
        break;
      case 1:
        return <Shop/>
        break;
      case 2:
        return <Shop/>
        break;
      default:
    }
  }

  render() {
    const { selectedIndex } = this.state
    return (
      <div>
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Home"
              icon={<div/>}
              style ={{background: selectedIndex === 0 ? 'rgba(38, 154, 204, 0.1)': '', color:'white', fontWeight:'bold'}}
              onTouchTap={() => this.select(0)}
            />
            <BottomNavigationItem
              label="Μαγαζί"
              icon={<div/>}
              style ={{background: selectedIndex === 1 ? 'rgba(38, 154, 204, 0.1)' : '', color:'white', fontWeight:'bold'}}
              onTouchTap={() => this.select(1)}
            />
          </BottomNavigation>
        </Paper>
        {this.whatRender()}
      </div>
    );
  }
}

export default BottomNavigationExampleSimple;
