import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { VERSION } from '@angular/core';
import * as dwv from 'dwv';
import { MatDialog } from '@angular/material/dialog';
import { TagsDialogComponent } from './tags-dialog.component';

// gui overrides

// get element
dwv.gui.getElement = dwv.gui.base.getElement;
// prompt
dwv.gui.prompt = prompt;

// Image decoders (for web workers)
dwv.image.decoderScripts = {
    jpeg2000: 'assets/dwv/decoders/pdfjs/decode-jpeg2000.js',
    'jpeg-lossless': 'assets/dwv/decoders/rii-mango/decode-jpegloss.js',
    'jpeg-baseline': 'assets/dwv/decoders/pdfjs/decode-jpegbaseline.js',
    rle: 'assets/dwv/decoders/dwv/decode-rle.js'
};

@Component({
  selector: 'app-dwv',
  templateUrl: './dwv.component.html',
  styleUrls: ['./dwv.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DwvComponent implements OnInit {
  public versions: any;
  public tools = {
      Scroll: {},
      FastPoint2D: {},
      ZoomAndPan: {},
      WindowLevel: {},
      Draw: {
          options: ['Ruler','Circle','Ellipse', 'Rectangle','FreeHand','Protractor','Roi', 'Point2D'],
          type: 'factory',
          events: ['drawcreate', 'drawchange', 'drawmove', 'drawdelete']
      }
  };
  public toolNames: string[];
  public selectedTool = 'Select Tool';
  public loadProgress = 0;
  public dataLoaded = false;

  private dwvApp: any;
  private metaData: any[];

  // drop box class name
  private dropboxDivId = 'dropBox';
  private dropboxClassName = 'dropBox';
  private borderClassName = 'dropBoxBorder';
  private hoverClassName = 'hover';

  public draw2 = "Circle"
  public ellipse = 'Ellipse'
  public rectangle ="Rectangle"
  public freehand = 'FreeHand'
  public prot = "Protector"
  public roi = 'Roi'
  public point = "Point2D"

  constructor(public dialog: MatDialog) {
    this.versions = {
      dwv: dwv.getVersion(),
      angular: VERSION.full
    };
  }

  ngOnInit() {
    // create app
    this.dwvApp = new dwv.App();
    // initialise app
    this.dwvApp.init({
      containerDivId: 'dwv',
      tools: this.tools
    });
    // handle load events
    let nLoadItem = null;
    let nReceivedError = null;
    let nReceivedAbort = null;
    this.dwvApp.addEventListener('loadstart', (/*event*/) => {
      // reset flags
      this.dataLoaded = false;
      nLoadItem = 0;
      nReceivedError = 0;
      nReceivedAbort = 0;
      // hide drop box
      this.showDropbox(false);
    });
    this.dwvApp.addEventListener('loadprogress', (event) => {
      this.loadProgress = event.loaded;
    });
    this.dwvApp.addEventListener('load', (/*event*/) => {
      // set dicom tags
      this.metaData = dwv.utils.objectToArray(this.dwvApp.getMetaData());
      // available tools
      this.toolNames = [];
      for (const key in this.tools) {
        if ((key === 'Scroll' && this.dwvApp.canScroll()) ||
          (key === 'WindowLevel' && this.dwvApp.canWindowLevel()) ||
          (key !== 'Scroll' && key !== 'WindowLevel')) {
          this.toolNames.push(key);
        }
      }
      this.onChangeTool(this.toolNames[0]);
      // set data loaded flag
      this.dataLoaded = true;
    });
    this.dwvApp.addEventListener('loadend', (/*event*/) => {
      if (nReceivedError) {
        this.loadProgress = 0;
        alert('Received errors during load. Check log for details.');
        // show drop box if nothing has been loaded
        if (!nLoadItem) {
          this.showDropbox(true);
        }
      }
      if (nReceivedAbort) {
        this.loadProgress = 0;
        alert('Load was aborted.');
        this.showDropbox(true);
      }
    });
    this.dwvApp.addEventListener('loaditem', (/*event*/) => {
      ++nLoadItem;
    });
    this.dwvApp.addEventListener('error', (event) => {
      console.error(event.error);
      ++nReceivedError;
    });
    this.dwvApp.addEventListener('abort', (/*event*/) => {
      ++nReceivedAbort;
    });

    // handle key events
    this.dwvApp.addEventListener('keydown', (event) => {
        this.dwvApp.defaultOnKeydown(event);
    });
    // handle window resize
    window.addEventListener('resize', this.dwvApp.onResize);

    // setup drop box
    this.setupDropbox();

    // possible load from location
    dwv.utils.loadFromUri(window.location.href, this.dwvApp);

    console.log(dwv.math.Point2D)
    // document.addEventListener("click", this.printMousePos);
  
  }
  clientX:any
  clientY:any
  
  
  // public Point2D = dwv.math.Point2D
  /**
   * Handle a change tool event.
   * @param tool The new tool name.
   */
  onChangeTool = (tool: string) => {
    if ( this.dwvApp ) {
      this.selectedTool = tool;
      this.dwvApp.setTool(tool);
      if (tool === 'Draw') {
        this.onChangeShape(this.tools.Draw.options[0]);
      }
    }
  }
  onChangeTool2 = (tool: string) => {
    if ( this.dwvApp ) {
      this.selectedTool = tool;
      this.dwvApp.setTool(tool);
      if (tool === 'Draw') {
        this.onChangeShape(this.tools.Draw.options[1]);
      }
    }
  }
  onChangeToo3 = (tool: string) => {
    if ( this.dwvApp ) {
      this.selectedTool = tool;
      this.dwvApp.setTool(tool);
      if (tool === 'Draw') {
        this.onChangeShape(this.tools.Draw.options[2]);
      }
    }
  }
  onChangeToo4 = (tool: string) => {
    if ( this.dwvApp ) {
      this.selectedTool = tool;
      this.dwvApp.setTool(tool);
      if (tool === 'Draw') {
        this.onChangeShape(this.tools.Draw.options[3]);
      }
    }
  }
  onChangeToo5 = (tool: string) => {
    if ( this.dwvApp ) {
      this.selectedTool = tool;
      this.dwvApp.setTool(tool);
      if (tool === 'Draw') {
        this.onChangeShape(this.tools.Draw.options[4]);
      }
    }
  }
  onChangeToo6 = (tool: string) => {
    if ( this.dwvApp ) {
      this.selectedTool = tool;
      this.dwvApp.setTool(tool);
      if (tool === 'Draw') {
        this.onChangeShape(this.tools.Draw.options[5]);
      }
    }
  }
  onChangeToo7 = (tool: string) => {
    if ( this.dwvApp ) {
      this.selectedTool = tool;
      this.dwvApp.setTool(tool);
      if (tool === 'Draw') {
        this.onChangeShape(this.tools.Draw.options[6]);
      }
    }
  }
  onChangeToo8= (tool: string) => {
    if ( this.dwvApp ) {
      this.selectedTool = tool;
      this.dwvApp.setTool(tool);
      if (tool === 'Draw') {
        this.onChangeShape(this.tools.Draw.options[7]);
      }
    }
  }

  /**
   * Handle a change draw shape event.
   * @param shape The new shape name.
   */
  private onChangeShape = (shape: string) => {
    if ( this.dwvApp && this.selectedTool === 'Draw') {
      // this.dwvApp.tool.draw.CircleFactory
      this.dwvApp.setDrawShape(shape)
      // this.dwvApp.zoom(2)
    }
  }

  /**
   * Handle a reset event.
   */
  onReset = () => {
    if ( this.dwvApp ) {
      this.dwvApp.resetDisplay();
    }
  }

  /**
   * Open the DICOM tags dialog.
   */
  openTagsDialog = () => {
    this.dialog.open(TagsDialogComponent,
      {
        width: '80%',
        height: '90%',
        data: {
          title: 'DICOM Tags',
          value: this.metaData
        }
      }
    );
  }

  // drag and drop [begin] -----------------------------------------------------

  /**
   * Setup the data load drop box: add event listeners and set initial size.
   */
  private setupDropbox = () => {
    this.showDropbox(true);
  }

  /**
   * Default drag event handling.
   * @param event The event to handle.
   */
  private defaultHandleDragEvent = (event: DragEvent) => {
    // prevent default handling
    event.stopPropagation();
    event.preventDefault();
  }

  /**
   * Handle a drag over.
   * @param event The event to handle.
   */
  private onBoxDragOver = (event: DragEvent) => {
    this.defaultHandleDragEvent(event);
    // update box border
    const box = document.getElementById(this.dropboxDivId);
    if (box && box.className.indexOf(this.hoverClassName) === -1) {
        box.className += ' ' + this.hoverClassName;
    }
  }

  /**
   * Handle a drag leave.
   * @param event The event to handle.
   */
  private onBoxDragLeave = (event: DragEvent) => {
    this.defaultHandleDragEvent(event);
    // update box border
    const box = document.getElementById(this.dropboxDivId);
    if (box && box.className.indexOf(this.hoverClassName) !== -1) {
        box.className = box.className.replace(' ' + this.hoverClassName, '');
    }
  }

  /**
   * Handle a drop event.
   * @param event The event to handle.
   */
  private onDrop = (event: DragEvent) => {
    this.defaultHandleDragEvent(event);
    // load files
    this.dwvApp.loadFiles(event.dataTransfer.files);
  }
  
  /**
   * Show/hide the data load drop box.
   * @param show True to show the drop box.
   */
  private showDropbox = (show: boolean) => {
    const box = document.getElementById(this.dropboxDivId);
    const isBoxShown = box && box.offsetHeight !== 0;
    const layerDiv = this.dwvApp?.getElement('layerContainer');

    if (box) {
      if (show && !isBoxShown) {
        // reset css class
        box.className = this.dropboxClassName + ' ' + this.borderClassName;
        // check content
        if (box.innerHTML === '') {
          const p = document.createElement('p');
          p.appendChild(document.createTextNode('Drag and drop data here'));
          box.appendChild(p);
        }
        // show box
        box.setAttribute('style', 'visible:true;width:50%;height:75%');
        // stop layer listening
        if (layerDiv) {
          layerDiv.removeEventListener('dragover', this.defaultHandleDragEvent);
          layerDiv.removeEventListener('dragleave', this.defaultHandleDragEvent);
          layerDiv.removeEventListener('drop', this.onDrop);
        }
        // listen to box events
        box.addEventListener('dragover', this.onBoxDragOver);
        box.addEventListener('dragleave', this.onBoxDragLeave);
        box.addEventListener('drop', this.onDrop);
      } else {
        // remove border css class
        box.className = this.dropboxClassName;
        // remove content
        box.innerHTML = '';
        // hide box
        box.setAttribute('style', 'visible:false;width:0;height:0');
        // stop box listening
        box.removeEventListener('dragover', this.onBoxDragOver);
        box.removeEventListener('dragleave', this.onBoxDragLeave);
        box.removeEventListener('drop', this.onDrop);
        // listen to layer events
        if (layerDiv) {
          layerDiv.addEventListener('dragover', this.defaultHandleDragEvent);
          layerDiv.addEventListener('dragleave', this.defaultHandleDragEvent);
          layerDiv.addEventListener('drop', this.onDrop);
        }
      }
    }
  }

  // drag and drop [end] -------------------------------------------------------

}
