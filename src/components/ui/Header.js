import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { makeStyles } from '@material-ui/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import logo from '../../assets/logo.svg'

function ElevationScroll (props) {
  const { children } = props

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}
const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down('md')]: {
      height: '7em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em',
    },
  },
  logoContainer: {
    padding: '0',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  button: {
    borderRadius: '50px',
    margin: '0 25px 0 50px',
    height: '45px',
    ...theme.typography.estimate,
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0px',
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
  drawerIcon: {
    height: '50px',
    width: '50px',
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}))

export default function Header () {
  const classes = useStyles()
  const theme = useTheme()
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const matches = useMediaQuery(theme.breakpoints.down('md')) // medium and below
  const [openDrawer, setOpenDrawer] = useState(false)
  const [value, setValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openMenu, setOpenMenu] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // eslint-disable-next-line no-shadow
  const handleChange = (e, newValue) => {
    setValue(newValue)
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
    setOpenMenu(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpenMenu(false)
  }
  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null)
    setOpenMenu(false)
    setSelectedIndex(i)
  }
  const menuOptions = [
    {
      name: 'Services',
      link: '/services',
    },
    {
      name: 'Custom Software Development',
      link: '/customsoftware',
    },
    {
      name: 'Mobile App Development',
      link: '/mobileapps',
    },
    {
      name: 'Websites Development',
      link: '/websites',
    },
  ]

  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
        if (value !== 0) {
          setValue(0)
        }
        break
      case '/services':
        if (value !== 1) {
          setValue(1)
          setSelectedIndex(0)
        }
        break
      case '/customsoftware':
        if (value !== 1) {
          setValue(1)
          setSelectedIndex(1)
        }
        break
      case '/mobileapps':
        if (value !== 1) {
          setValue(1)
          setSelectedIndex(2)
        }
        break
      case '/websites':
        if (value !== 1) {
          setValue(1)
          setSelectedIndex(3)
        }
        break
      case '/revolution':
        if (value !== 2) {
          setValue(2)
        }
        break
      case '/about':
        if (value !== 3) {
          setValue(3)
        }
        break
      case '/contact':
        if (value !== 4) {
          setValue(4)
        }
        break
      case '/estimate':
        if (value !== 5) {
          setValue(5)
        }
        break
      default:
        break
    }
  }, [value])

  const tabs = (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor='primary'
      >
        <Tab className={classes.tab} component={Link} to='/' label='Home' />
        <Tab
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup={anchorEl ? 'true' : undefined}
          className={classes.tab}
          component={Link}
          onMouseOver={handleClick}
          to='/services'
          label='Services'
        />
        <Tab
          className={classes.tab}
          component={Link}
          to='/revolution'
          label='The Revolution'
        />
        <Tab
          className={classes.tab}
          component={Link}
          to='/about'
          label='About us'
        />
        <Tab
          className={classes.tab}
          component={Link}
          to='/contact'
          label='Contact us'
        />
      </Tabs>
      <Button
        variant='contained'
        color='secondary'
        className={classes.button}
        component={Link}
        to='/estimate'
      >
        Free Estimate
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        classes={{ paper: classes.menu }}
        MenuListProps={{ onMouseLeave: handleClose }}
        elevation={0}
      >
        {menuOptions.map((option, index) => (
          <MenuItem
            key={index}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            onClick={(e) => {
              handleMenuItemClick(e, index)
              setValue(1)
              handleClose()
            }}
            selected={selectedIndex === index && value === 1}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  )

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        <List>
          <ListItem component={Link} to='/'>
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem component={Link} to='/services'>
            <ListItemText>Services</ListItemText>
          </ListItem>
          <ListItem component={Link} to='/revolution'>
            <ListItemText>The Revolution</ListItemText>
          </ListItem>
          <ListItem component={Link} to='/about'>
            <ListItemText>About</ListItemText>
          </ListItem>
          <ListItem component={Link} to='/contact'>
            <ListItemText>Contact Us</ListItemText>
          </ListItem>
          <ListItem component={Link} to='/estimate'>
            <ListItemText>Free estimate</ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  )
  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar>
          <ToolBar disableGutters>
            <Button
              onClick={() => setValue(0)}
              component={Link}
              to='/'
              disableRipple
              className={classes.logoContainer}
            >
              <img alt='company logo' className={classes.logo} src={logo} />
            </Button>
            {matches ? drawer : tabs}
          </ToolBar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  )
}
