import { initCallback } from './callbacks.js'
import { on } from './event.js'
import { supports } from './globals.js'

import Alert from './../alert-native.js'
import Button from './../button-native.js'
import Carousel from './../carousel-native.js'
import Collapse from './../collapse-native.js'
import Dropdown from './../dropdown-native.js'
import Modal from './../modal-native.js'
import Popover from './../popover-native.js'
import ScrollSpy from './../scrollspy-native.js'
import Tab from './../tab-native.js'
import Toast from './../toast-native.js'
import Tooltip from './../tooltip-native.js'

// populate supports with all components
supports.push( ['Alert', Alert, '[data-dismiss="alert"]'] )
supports.push( ['Button', Button, '[data-toggle="buttons"]' ] )
supports.push( ['Carousel', Carousel, '[data-ride="carousel"]' ] )
supports.push( ['Collapse', Collapse, '[data-toggle="collapse"]' ] )
supports.push( ['Dropdown', Dropdown, '[data-toggle="dropdown"]'] )
supports.push( ['Modal', Modal, '[data-toggle="modal"]' ] )
supports.push( ['Popover', Popover, '[data-toggle="popover"],[data-tip="popover"]' ] )
supports.push( ['ScrollSpy', ScrollSpy, '[data-spy="scroll"]' ] )
supports.push( ['Tab', Tab, '[data-toggle="tab"]' ] )
supports.push( ['Toast', Toast, '[data-dismiss="toast"]' ] )
supports.push( ['Tooltip', Tooltip, '[data-toggle="tooltip"],[data-tip="tooltip"]' ] )

// bulk initialize all components
document.body ? initCallback() : on( document, 'DOMContentLoaded', initCallback );
