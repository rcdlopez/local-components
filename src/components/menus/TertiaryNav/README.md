The TertiaryNav component follows a two-column master/detail pattern with a nav menu in the left column and content associated the active menu item displayed in the right column. 
React Router 4 is used for routing and the props used for TertiaryNavItem mirror that API.

Simple example where the TertiaryNav Items in the left column change the content (via the __component__ prop) in the right column.

```js
import { TertiaryNav, TertiaryNavItem } from './TertiaryNav';

const Item1 = () => (<div>Item 1 Content</div>);
const Item2 = () => (<div>Item 2 Content</div>);
const Item3 = () => (<div>Item 3 Content</div>);

<TertiaryNav>
   <TertiaryNavItem exact path='/' component={Item1}>Menu Item 1</TertiaryNavItem>
   <TertiaryNavItem path='/item2' component={Item2}>Menu Item 2</TertiaryNavItem>
   <TertiaryNavItem path='/item3' component={Item3}>Menu Item 3</TertiaryNavItem>
</TertiaryNav>
```

An example showing error state.

```js
import { TertiaryNav, TertiaryNavItem } from './TertiaryNav';

const Item1 = () => (<div><div>Item 1 Content</div><div className='TertiaryNavChild__Error'>error message example</div></div>);
const Item2 = () => (<div>Item 2 Content</div>);
const Item3 = () => (<div>Item 3 Content</div>);

<TertiaryNav>
    <TertiaryNavItem variant={'error'} exact path='/' component={Item1}>Menu Item 1</TertiaryNavItem>
    <TertiaryNavItem path='/item2' component={Item2}>Menu Item 2</TertiaryNavItem>
    <TertiaryNavItem path='/item3' component={Item3}>Menu Item 3</TertiaryNavItem>
</TertiaryNav>
```

Advanced pattern combining the TertiaryNav with the Drawer component.

```js
import { TertiaryNav, TertiaryNavItem } from './TertiaryNav';
import Drawer from '../Drawer/Drawer';
import { PrimaryButton } from '../../buttons/PrimaryButton/PrimaryButton';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

const Item2 = () => (<div>Item 2 Content</div>);
const Item3 = () => (<div>Item 3 Content</div>);

class Item1 extends React.Component{
    constructor (props) {
        super(props);

        this.state = {
            value: 'change this text',
        };
        
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange (e) { 
        this.setState({value: e.target.value});
        this.props.onChange(e.target.value);
    }
    	
    render () {
        return (
            <input type="text" value={this.state.value} onChange={this.handleChange} />
        );
    }
}

Item1.propTypes = {
  onChange: PropTypes.func,
};

class TertiaryNavExample extends React.Component{
    constructor (props, context) { 
       super(props, context);
    
       this.state = {
          showDrawer: false
       };
       
       this.onChange = this.onChange.bind(this);
       this.onSave = this.onSave.bind(this);
    }
    
    onChange () {
        this.setState({
            showDrawer: true,
        });
    }
    
    onSave () {
        this.setState({
            showDrawer: false,
        });
    }

    render () {
        return (
            <div style={{position: 'relative', display: 'flex', height: '100%'}}>
                <TertiaryNav>
                    <TertiaryNavItem exact path='/' render={(props) => <Item1 {...props} onChange={this.onChange} />}>Item 1</TertiaryNavItem>
                    <TertiaryNavItem path='/item2' component={Item2}>Item 2</TertiaryNavItem>
                    <TertiaryNavItem path='/item3' component={Item3}>Item 3</TertiaryNavItem>
                </TertiaryNav>
                <Drawer show={this.state.showDrawer}>
                    <PrimaryButton onClick={this.onSave}>Save</PrimaryButton>
                </Drawer>
            </div>
        );
    }
}

<div style={{height: '200px'}}>
    <TertiaryNavExample />
</div>
```
