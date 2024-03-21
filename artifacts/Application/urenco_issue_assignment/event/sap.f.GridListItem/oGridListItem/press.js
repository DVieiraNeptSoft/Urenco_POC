oEvent.oSource.setSelected(!oEvent.oSource.getSelected());
if (oEvent.oSource.getBindingContext().getProperty("text") === 'Other' && oEvent.oSource.getSelected() == true){
    oEvent.oSource.getContent()[0].getItems()[1].setVisible(true);
} else {
    oEvent.oSource.getContent()[0].getItems()[1].setVisible(false);
}
