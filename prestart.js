sc.MapAreaContainer.inject({
  mouseWasOverWhenDragged: false,

  onMouseInteract(mouseOver, mouseClicked) {
    let mapWasBeingDragged = sc.menu.mapDrag;

    this.parent(mouseOver, mouseClicked);

    if (
      !(
        !ig.interact.isBlocked() &&
        !mouseClicked &&
        sc.map.getCurrentArea() != null &&
        this.buttongroup.isActive() &&
        !sc.menu.mapLoading &&
        !sc.menu.mapStampMenu
      )
    ) {
      return;
    }

    let mouseWasOverWhenDragged = this.mouseWasOverWhenDragged;
    this.mouseWasOverWhenDragged = mouseOver;

    if (
      !(
        mouseWasOverWhenDragged &&
        mouseOver &&
        mapWasBeingDragged &&
        !sc.menu.mapDrag &&
        sc.menu.mapMapFocus == null &&
        this.hoverRoom != null
      )
    ) {
      return;
    }

    if (sc.menu.mapWasDragged) {
      sc.menu.mapWasDragged = false;
      return;
    }

    let hoveredMapName = this.hoverRoom.text;
    let hoveredMapID = this.hoverRoom.name;
    let dialogText = `\\c[3]Teleport\\c[0] to map "${hoveredMapName}"?\n\\c[3]Map ID:\\c[0] ${hoveredMapID}`;
    sc.BUTTON_SOUND.submit.play();
    sc.Dialogs.showYesNoDialog(dialogText, sc.DIALOG_INFO_ICON.QUESTION, (dialogBtn) => {
      sc.menu.mapDrag = false;
      if (dialogBtn.data === 0) {
        sc.map.startTeleport({ path: hoveredMapID });
      }
    });
  },
});
