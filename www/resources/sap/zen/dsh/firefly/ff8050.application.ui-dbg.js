/*!
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
/*global sap*/
sap.ui.define(
[
"sap/zen/dsh/firefly/ff3100.system.ui","sap/zen/dsh/firefly/ff8000.quasar","sap/zen/dsh/firefly/ff4200.olap.api","sap/zen/dsh/firefly/ff5500.story","sap/zen/dsh/firefly/ff8010.olap.ui"
],
function(oFF)
{
"use strict";

oFF.ShCell = function() {};
oFF.ShCell.prototype = new oFF.XObject();
oFF.ShCell.prototype._ff_c = "ShCell";

oFF.ShCell.create = function(doc, x, y)
{
	var cell = new oFF.ShCell();
	cell.setPosition(x, y);
	cell.m_document = doc;
	return cell;
};
oFF.ShCell.convertToAZ = function(column)
{
	var buffer = oFF.XStringBuffer.create();
	if (column < 26)
	{
		buffer.appendChar(65 + column);
	}
	else
	{
		buffer.append("ZZ");
	}
	return buffer;
};
oFF.ShCell.prototype.m_x = 0;
oFF.ShCell.prototype.m_y = 0;
oFF.ShCell.prototype.m_name = null;
oFF.ShCell.prototype.m_key = null;
oFF.ShCell.prototype.m_value = null;
oFF.ShCell.prototype.m_text = null;
oFF.ShCell.prototype.m_expression = null;
oFF.ShCell.prototype.m_int = 0;
oFF.ShCell.prototype.m_double = 0.0;
oFF.ShCell.prototype.m_type = null;
oFF.ShCell.prototype.m_document = null;
oFF.ShCell.prototype.setPosition = function(x, y)
{
	this.m_x = x;
	this.m_y = y;
	var buffer = oFF.ShCell.convertToAZ(this.m_x);
	buffer.appendInt(this.m_y);
	this.m_name = buffer.toString();
	var buffer2 = oFF.XStringBuffer.create();
	buffer2.appendInt(this.m_x);
	buffer2.append("_");
	buffer2.appendInt(this.m_y);
	this.m_key = buffer2.toString();
};
oFF.ShCell.prototype.setInteger = function(value)
{
	this.m_int = value;
	this.m_value = oFF.XInteger.convertToString(this.m_int);
	this.m_type = oFF.XValueType.INTEGER;
	return this;
};
oFF.ShCell.prototype.getInteger = function()
{
	return this.m_int;
};
oFF.ShCell.prototype.setDouble = function(value)
{
	this.m_double = value;
	this.m_value = oFF.XDouble.convertToString(this.m_double);
	this.m_type = oFF.XValueType.DOUBLE;
	return this;
};
oFF.ShCell.prototype.getDouble = function()
{
	return this.m_double;
};
oFF.ShCell.prototype.setText = function(text)
{
	this.m_text = text;
	this.m_value = this.m_text;
	this.m_type = oFF.XValueType.STRING;
	return this;
};
oFF.ShCell.prototype.setExpression = function(expression)
{
	this.m_expression = expression;
	this.m_value = this.m_expression;
	this.m_type = oFF.XComponentType._DATASOURCE;
	return this;
};
oFF.ShCell.prototype.getName = function()
{
	return this.m_name;
};
oFF.ShCell.prototype.getKey = function()
{
	return this.m_key;
};
oFF.ShCell.prototype.hasExpression = function()
{
	return oFF.notNull(this.m_expression);
};
oFF.ShCell.prototype.hasNumber = function()
{
	return this.m_type.isTypeOf(oFF.XValueType.NUMBER);
};
oFF.ShCell.prototype.getValueType = function()
{
	return this.m_type;
};
oFF.ShCell.prototype.getExpression = function()
{
	return this.m_expression;
};
oFF.ShCell.prototype.beforeScriptExecution = function(interpreter) {};
oFF.ShCell.prototype.afterScriptExecution = function(interpreter) {};
oFF.ShCell.prototype.nativeCall = function(interpreter, name, registerObj, stack, parameterCount)
{
	var offset = stack.size() - parameterCount;
	var result = null;
	var stackObj = stack.get(offset);
	var componentType;
	if (oFF.XString.isEqual("set", name))
	{
		if (oFF.notNull(stackObj))
		{
			componentType = stackObj.getComponentType();
			if (componentType === oFF.XValueType.STRING)
			{
				this.setText(stackObj.getString());
			}
			else if (componentType === oFF.XValueType.INTEGER)
			{
				var intValue = stackObj;
				this.setInteger(intValue.getInteger());
			}
		}
	}
	else if (oFF.XString.isEqual("sum", name))
	{
		if (oFF.notNull(stackObj))
		{
			componentType = stackObj.getComponentType();
			if (componentType === oFF.XValueType.STRING)
			{
				var stringValue = stackObj.getString();
				var selection = this.parseSelection(stringValue);
				var cells = this.m_document.select(selection);
				var theSum = 0.0;
				for (var i = 0; i < cells.size(); i++)
				{
					var current = cells.get(i);
					var valueType = current.getValueType();
					if (valueType === oFF.XValueType.INTEGER)
					{
						var currentInt = current.getInteger();
						theSum = theSum + currentInt;
					}
					else if (valueType === oFF.XValueType.DOUBLE)
					{
						var currentDouble = current.getDouble();
						theSum = theSum + currentDouble;
					}
				}
				this.setDouble(theSum);
			}
		}
	}
	return result;
};
oFF.ShCell.prototype.parseSelection = function(query)
{
	var sep = oFF.XString.indexOf(query, ":");
	var first = null;
	var second = null;
	if (sep !== -1)
	{
		first = oFF.XString.substring(query, 0, sep);
		second = oFF.XString.substring(query, sep + 1, -1);
	}
	else
	{
		first = query;
	}
	var selection = oFF.ShSelection.create();
	var firstPosition = this.parsePosition(first);
	selection.setStart(firstPosition);
	if (oFF.notNull(second))
	{
		var secondPosition = this.parsePosition(second);
		selection.setEnd(secondPosition);
	}
	return selection;
};
oFF.ShCell.prototype.parsePosition = function(value)
{
	var letter = oFF.XString.getCharAt(value, 0);
	var number = oFF.XString.getCharAt(value, 1);
	var x = letter - 65;
	var y = number - 49;
	return oFF.ShPosition.create(x, y);
};
oFF.ShCell.prototype.toString = function()
{
	return this.m_value;
};

oFF.ShDocument = function() {};
oFF.ShDocument.prototype = new oFF.XObject();
oFF.ShDocument.prototype._ff_c = "ShDocument";

oFF.ShDocument.create = function()
{
	var newObj = new oFF.ShDocument();
	newObj.setup();
	return newObj;
};
oFF.ShDocument.prototype.m_rowCount = 0;
oFF.ShDocument.prototype.m_colCount = 0;
oFF.ShDocument.prototype.m_emptyCell = null;
oFF.ShDocument.prototype.m_cells = null;
oFF.ShDocument.prototype.setup = function()
{
	oFF.XObject.prototype.setup.call( this );
	this.m_emptyCell = oFF.ShCell.create(this, 0, 0);
	this.m_cells = oFF.XHashMapByString.create();
};
oFF.ShDocument.prototype.newCell = function(x, y)
{
	var cell = oFF.ShCell.create(this, x, y);
	var key = cell.getKey();
	this.m_cells.put(key, cell);
	if (x >= this.m_colCount)
	{
		this.m_colCount = x + 1;
	}
	if (y >= this.m_rowCount)
	{
		this.m_rowCount = y + 1;
	}
	return cell;
};
oFF.ShDocument.prototype.getCell = function(x, y)
{
	var key = oFF.XStringBuffer.create().appendInt(x).append("_").appendInt(y).toString();
	var cell = this.m_cells.getByKey(key);
	if (oFF.isNull(cell))
	{
		cell = this.m_emptyCell;
	}
	return cell;
};
oFF.ShDocument.prototype.evaluate = function()
{
	var cells = this.m_cells.getIterator();
	var cellsWithExpressions = oFF.XList.create();
	while (cells.hasNext())
	{
		var current = cells.next();
		if (current.hasExpression())
		{
			cellsWithExpressions.add(current);
		}
	}
	for (var i = 0; i < cellsWithExpressions.size(); i++)
	{
		var cell = cellsWithExpressions.get(i);
		this.evaluateCell(cell);
	}
};
oFF.ShDocument.prototype.evaluateCell = function(cell)
{
	var script = cell.getExpression();
	var interpreter = oFF.ScriptEngine.create();
	interpreter.setVmCallback(cell);
	interpreter.compile(script);
	if (interpreter.isValid())
	{
		interpreter.execute();
	}
};
oFF.ShDocument.prototype.select = function(selection)
{
	var cells = oFF.XList.create();
	var startX = selection.getStartX();
	var startY = selection.getStartX();
	var endX = selection.getEndX();
	var endY = selection.getEndY();
	if (startX === -1)
	{
		startX = 0;
	}
	if (startY === -1)
	{
		startY = 0;
	}
	if (endX === -1)
	{
		endX = this.m_colCount - 1;
	}
	if (endY === -1)
	{
		endY = this.m_rowCount - 1;
	}
	var cell;
	for (var y = startY; y <= endY; y++)
	{
		for (var x = startX; x <= endX; x++)
		{
			cell = this.getCell(x, y);
			cells.add(cell);
		}
	}
	return cells;
};
oFF.ShDocument.prototype.toGridStructure = function()
{
	var model = oFF.PrFactory.createStructure();
	model.putInteger("RowCount", this.m_rowCount + 1);
	model.putInteger("ColCount", this.m_colCount + 1);
	var cells = model.putNewList("Cells");
	for (var y = 0; y < this.m_rowCount + 1; y++)
	{
		for (var x = 0; x < this.m_colCount + 1; x++)
		{
			var cellTarget = cells.addNewStructure();
			cellTarget.putString("Type", "Text");
			if (x > 0 && y > 0)
			{
				var cell = this.getCell(x - 1, y - 1);
				cellTarget.putString("Value", cell.toString());
				cellTarget.putString("Color", "#AABBCC");
			}
			else if (x === 0 && y > 0)
			{
				cellTarget.putString("Value", oFF.XInteger.convertToString(y));
				cellTarget.putString("Color", "#AABB00");
			}
			else if (y === 0 && x > 0)
			{
				cellTarget.putString("Value", oFF.ShCell.convertToAZ(x - 1).toString());
				cellTarget.putString("Color", "#00BB00");
			}
			else
			{
				cellTarget.putString("Value", "");
				cellTarget.putString("Color", "#00BB00");
			}
		}
	}
	return model;
};
oFF.ShDocument.prototype.toString = function()
{
	var cell;
	var content;
	var size;
	var colWidth = oFF.XArrayOfInt.create(this.m_colCount + 1);
	for (var y = 0; y < this.m_rowCount + 1; y++)
	{
		for (var x = 0; x < this.m_colCount + 1; x++)
		{
			if (x > 0 && y > 0)
			{
				cell = this.getCell(x - 1, y - 1);
				content = cell.toString();
			}
			else if (x === 0 && y > 0)
			{
				content = oFF.XInteger.convertToString(y);
			}
			else if (y === 0 && x > 0)
			{
				content = oFF.ShCell.convertToAZ(x - 1).toString();
			}
			else
			{
				content = "";
			}
			if (oFF.isNull(content))
			{
				size = 0;
			}
			else
			{
				size = oFF.XString.size(content);
			}
			if (size > colWidth.get(x))
			{
				colWidth.set(x, size);
			}
		}
	}
	var buffer = oFF.XStringBuffer.create();
	for (var ii = 0; ii < this.m_rowCount + 1; ii++)
	{
		if (ii > 0)
		{
			buffer.appendNewLine();
		}
		for (var jj = 0; jj < this.m_colCount + 1; jj++)
		{
			if (jj > 0)
			{
				buffer.append(" | ");
			}
			if (jj > 0 && ii > 0)
			{
				cell = this.getCell(jj - 1, ii - 1);
				content = cell.toString();
			}
			else if (jj === 0 && ii > 0)
			{
				content = oFF.XInteger.convertToString(ii);
			}
			else if (ii === 0 && jj > 0)
			{
				content = oFF.ShCell.convertToAZ(jj - 1).toString();
			}
			else
			{
				content = "";
			}
			if (oFF.isNull(content))
			{
				size = 0;
			}
			else
			{
				size = oFF.XString.size(content);
			}
			var delta = colWidth.get(jj) - size;
			for (var k = 0; k < delta; k++)
			{
				buffer.append(" ");
			}
			buffer.append(content);
		}
	}
	return buffer.toString();
};

oFF.ShPosition = function() {};
oFF.ShPosition.prototype = new oFF.XObject();
oFF.ShPosition.prototype._ff_c = "ShPosition";

oFF.ShPosition.create = function(x, y)
{
	var newObj = new oFF.ShPosition();
	newObj.m_x = x;
	newObj.m_y = y;
	return newObj;
};
oFF.ShPosition.prototype.m_x = 0;
oFF.ShPosition.prototype.m_y = 0;
oFF.ShPosition.prototype.getX = function()
{
	return this.m_x;
};
oFF.ShPosition.prototype.getY = function()
{
	return this.m_y;
};
oFF.ShPosition.prototype.toString = function()
{
	return oFF.XStringBuffer.create().append("X: ").appendInt(this.m_x).append(" Y: ").appendInt(this.m_y).toString();
};

oFF.ShSelection = function() {};
oFF.ShSelection.prototype = new oFF.XObject();
oFF.ShSelection.prototype._ff_c = "ShSelection";

oFF.ShSelection.create = function()
{
	var newObj = new oFF.ShSelection();
	newObj.setup();
	return newObj;
};
oFF.ShSelection.prototype.m_startX = 0;
oFF.ShSelection.prototype.m_startY = 0;
oFF.ShSelection.prototype.m_endX = 0;
oFF.ShSelection.prototype.m_endY = 0;
oFF.ShSelection.prototype.setup = function()
{
	this.m_startX = -1;
	this.m_startY = -1;
	this.m_endX = -1;
	this.m_endY = -1;
};
oFF.ShSelection.prototype.setStart = function(position)
{
	this.m_startX = position.getX();
	this.m_startY = position.getY();
};
oFF.ShSelection.prototype.setEnd = function(position)
{
	this.m_endX = position.getX();
	this.m_endY = position.getY();
};
oFF.ShSelection.prototype.getStartX = function()
{
	return this.m_startX;
};
oFF.ShSelection.prototype.getStartY = function()
{
	return this.m_startY;
};
oFF.ShSelection.prototype.getEndX = function()
{
	return this.m_endX;
};
oFF.ShSelection.prototype.getEndY = function()
{
	return this.m_endY;
};

oFF.GyrosNumberFormatter = function() {};
oFF.GyrosNumberFormatter.prototype = new oFF.XObject();
oFF.GyrosNumberFormatter.prototype._ff_c = "GyrosNumberFormatter";

oFF.GyrosNumberFormatter.create = function()
{
	return new oFF.GyrosNumberFormatter();
};
oFF.GyrosNumberFormatter.prototype.format = function(value)
{
	try
	{
		return oFF.XNumberFormatter.formatDoubleToString(oFF.XDouble.convertFromString(value), "#,#.###");
	}
	catch (e)
	{
		return value;
	}
};
oFF.GyrosNumberFormatter.prototype.parseFormattedNumber = function(value)
{
	if (oFF.XStringUtils.isNullOrEmpty(value))
	{
		return value;
	}
	var parsedValue = oFF.XString.replace(value, ",", "");
	try
	{
		var dValue = oFF.XDouble.convertFromString(parsedValue);
		return oFF.XDouble.convertToString(dValue);
	}
	catch (e)
	{
		return null;
	}
};
oFF.GyrosNumberFormatter.prototype.formatTextForDateTimeKey = function(textValue, keyValue, keyValueType)
{
	if (oFF.notNull(keyValue) && !oFF.XString.isEqual(textValue, "#") && keyValueType === oFF.XValueType.TIME || keyValueType === oFF.XValueType.DATE)
	{
		return oFF.XStringUtils.concatenate4(textValue, " [GyrosFormatted:", keyValue, "]");
	}
	return textValue;
};

oFF.UiFeatureToggleDialog = function() {};
oFF.UiFeatureToggleDialog.prototype = new oFF.XObject();
oFF.UiFeatureToggleDialog.prototype._ff_c = "UiFeatureToggleDialog";

oFF.UiFeatureToggleDialog.createFeatureDialog = function(session, uiMgr, listener)
{
	var obj = new oFF.UiFeatureToggleDialog();
	obj.setupExt(session, uiMgr, listener);
	return obj;
};
oFF.UiFeatureToggleDialog.prototype.m_dialog = null;
oFF.UiFeatureToggleDialog.prototype.m_okBtn = null;
oFF.UiFeatureToggleDialog.prototype.m_cancelBtn = null;
oFF.UiFeatureToggleDialog.prototype.m_featureList = null;
oFF.UiFeatureToggleDialog.prototype.m_listener = null;
oFF.UiFeatureToggleDialog.prototype.m_selectedToggles = null;
oFF.UiFeatureToggleDialog.prototype.setupExt = function(session, uiMgr, listener)
{
	this.m_listener = listener;
	this.m_dialog = uiMgr.newControl(oFF.UiType.DIALOG);
	this.m_dialog.setTitle("FeatureToggles");
	this.m_dialog.registerOnAfterClose(this);
	this.m_okBtn = this.m_dialog.addNewDialogButton();
	this.m_okBtn.setName("featureToggleOk");
	this.m_okBtn.setText("Ok");
	this.m_okBtn.registerOnPress(this);
	this.m_cancelBtn = this.m_dialog.addNewDialogButton();
	this.m_cancelBtn.setName("featureToggleCancel");
	this.m_cancelBtn.setText("Cancel");
	this.m_cancelBtn.registerOnPress(this);
	var dialogGenesis = oFF.UiGenesis.create(this.m_dialog, oFF.UiPosition.CONTENT, oFF.UiOperation.SET, 0, 0);
	this.m_featureList = oFF.UiFeatureToggleList.createFeatureList(session);
	this.m_featureList.buildUi(dialogGenesis);
	this.m_dialog.setWidthCss("40%");
};
oFF.UiFeatureToggleDialog.prototype.open = function()
{
	return this.m_dialog.open();
};
oFF.UiFeatureToggleDialog.prototype.onAfterClose = function(event)
{
	this.m_listener.onFeatureToggleDialogClose(this.m_selectedToggles);
};
oFF.UiFeatureToggleDialog.prototype.onPress = function(event)
{
	var control = event.getControl();
	if (control === this.m_okBtn)
	{
		this.m_selectedToggles = this.m_featureList.getSelectedToggles();
		this.m_dialog.close();
	}
	else if (control === this.m_cancelBtn)
	{
		this.m_selectedToggles = null;
		this.m_dialog.close();
	}
};
oFF.UiFeatureToggleDialog.prototype.releaseObject = function()
{
	this.m_dialog = oFF.XObjectExt.release(this.m_dialog);
	this.m_okBtn = null;
	this.m_cancelBtn = null;
	this.m_featureList = oFF.XObjectExt.release(this.m_featureList);
	this.m_selectedToggles = oFF.XObjectExt.release(this.m_selectedToggles);
	this.m_listener = null;
	oFF.XObject.prototype.releaseObject.call( this );
};

oFF.UiFeatureToggleList = function() {};
oFF.UiFeatureToggleList.prototype = new oFF.XObject();
oFF.UiFeatureToggleList.prototype._ff_c = "UiFeatureToggleList";

oFF.UiFeatureToggleList.createFeatureList = function(session)
{
	var obj = new oFF.UiFeatureToggleList();
	obj.setupExt(session);
	return obj;
};
oFF.UiFeatureToggleList.prototype.m_session = null;
oFF.UiFeatureToggleList.prototype.m_layout = null;
oFF.UiFeatureToggleList.prototype.m_searchField = null;
oFF.UiFeatureToggleList.prototype.m_list = null;
oFF.UiFeatureToggleList.prototype.m_allToggles = null;
oFF.UiFeatureToggleList.prototype.m_selectedToggles = null;
oFF.UiFeatureToggleList.prototype.setupExt = function(session)
{
	this.m_session = session;
	this.m_allToggles = oFF.FeatureToggleOlap.getAllFeatureToggles();
	this.m_selectedToggles = oFF.XSetOfNameObject.create();
	var iterator = this.m_allToggles.getIterator();
	while (iterator.hasNext())
	{
		var toggle = iterator.next();
		if (this.m_session.hasFeature(toggle))
		{
			this.m_selectedToggles.add(toggle);
		}
	}
};
oFF.UiFeatureToggleList.prototype.buildUi = function(genesis)
{
	this.m_layout = genesis.newRoot(oFF.UiType.FLEX_LAYOUT);
	this.m_layout.setDirection(oFF.UiFlexDirection.COLUMN);
	this.m_layout.setHeightCss("650px");
	this.m_layout.setMarginCss("4px");
	this.m_searchField = this.m_layout.addNewItemOfType(oFF.UiType.SEARCH_FIELD);
	this.m_searchField.registerOnSearch(this);
	var infoLayout = this.m_layout.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	infoLayout.setMarginCss("6px");
	infoLayout.setFlex("0 0 auto");
	infoLayout.addNewItemOfType(oFF.UiType.ICON).setIcon("message-information");
	infoLayout.addNewItemOfType(oFF.UiType.SPACER).setWidthCss("12px");
	infoLayout.addNewItemOfType(oFF.UiType.LABEL).setText("Toggles past the current XVersion cannot be disabled anymore.");
	var scroll = this.m_layout.addNewItemOfType(oFF.UiType.SCROLL_CONTAINER);
	scroll.setFlex("1 1 auto");
	this.m_list = scroll.setNewContent(oFF.UiType.LIST);
	this.m_list.setName("featureToggleList");
	this.m_list.setSelectionMode(oFF.UiSelectionMode.MULTI_SELECT);
	this.m_list.setBorderSizeCss("0px");
	this.m_list.registerOnSelectionChange(this);
	this.update(this.m_allToggles);
};
oFF.UiFeatureToggleList.prototype.update = function(toggles)
{
	this.m_list.clearItems();
	var iterator = toggles.getKeysAsIteratorOfString();
	while (iterator.hasNext())
	{
		var featureToggle = toggles.getByKey(iterator.next());
		var listItem = this.m_list.addNewItem();
		listItem.setText(featureToggle.getName());
		listItem.setCustomObject(featureToggle);
		listItem.setEnabled(featureToggle.getMaxXVersion() > this.m_session.getXVersion());
		listItem.setSelected(this.m_selectedToggles.contains(featureToggle));
	}
	oFF.XObjectExt.release(iterator);
};
oFF.UiFeatureToggleList.prototype.getSelectedToggles = function()
{
	return this.m_selectedToggles;
};
oFF.UiFeatureToggleList.prototype.onSearch = function(event)
{
	var clearButtonPressed = event.getParameters().getBooleanByKeyExt(oFF.UiControlEvent.PARAM_CLEAR_BUTTON_PRESSED, false);
	if (clearButtonPressed)
	{
		this.update(this.m_allToggles);
	}
	else
	{
		var searchText = event.getParameters().getStringByKeyExt(oFF.UiControlEvent.PARAM_SEARCH_TEXT, "");
		var toggles = oFF.XSetOfNameObject.create();
		var iterator = this.m_allToggles.getIterator();
		while (iterator.hasNext())
		{
			var toggle = iterator.next();
			if (oFF.XString.containsString(oFF.XString.toLowerCase(toggle.getName()), oFF.XString.toLowerCase(searchText)))
			{
				toggles.add(toggle);
			}
		}
		oFF.XObjectExt.release(iterator);
		this.update(toggles);
	}
};
oFF.UiFeatureToggleList.prototype.onSelectionChange = function(event)
{
	var displayedItems = this.m_list.getItems();
	var selectedItems = this.m_list.getSelectedItems();
	for (var i = 0; i < displayedItems.size(); i++)
	{
		var item = displayedItems.get(i);
		var toggle = item.getCustomObject();
		if (selectedItems.contains(item))
		{
			this.m_selectedToggles.add(toggle);
		}
		else
		{
			this.m_selectedToggles.removeElement(toggle);
		}
	}
};
oFF.UiFeatureToggleList.prototype.releaseObject = function()
{
	this.m_session = null;
	this.m_list = null;
	this.m_searchField = null;
	this.m_layout = oFF.XObjectExt.release(this.m_layout);
	this.m_selectedToggles = oFF.XObjectExt.release(this.m_selectedToggles);
	this.m_allToggles = null;
	oFF.XObject.prototype.releaseObject.call( this );
};

oFF.OqdController = function() {};
oFF.OqdController.prototype = new oFF.XObject();
oFF.OqdController.prototype._ff_c = "OqdController";

oFF.OqdController.create = function(application, uiManager, listener)
{
	var obj = new oFF.OqdController();
	obj.setupController(application, uiManager, listener);
	return obj;
};
oFF.OqdController.prototype.m_application = null;
oFF.OqdController.prototype.m_uiManager = null;
oFF.OqdController.prototype.m_listener = null;
oFF.OqdController.prototype.m_openQueryDialog = null;
oFF.OqdController.prototype.m_cancelBtn = null;
oFF.OqdController.prototype.m_systemsCombobox = null;
oFF.OqdController.prototype.m_queryListTable = null;
oFF.OqdController.prototype.m_searchInput = null;
oFF.OqdController.prototype.m_fullQueryNames = null;
oFF.OqdController.prototype.setupController = function(application, uiManager, listener)
{
	if (oFF.isNull(application))
	{
		throw oFF.XException.createRuntimeException("Cannot create a Open Query Dialog instance without an application. Please sepcify a application!");
	}
	if (oFF.isNull(uiManager))
	{
		throw oFF.XException.createRuntimeException("Cannot create a Open Query Dialog instance without a uiManager. Please sepcify a uiManager!");
	}
	this.m_application = application;
	this.m_uiManager = uiManager;
	this.m_listener = listener;
	this.m_fullQueryNames = oFF.XHashMapOfStringByString.create();
	var i18n = this.m_uiManager.getLocalization();
	var freeGenesis = this.m_uiManager.getFreeGenesis();
	this.m_openQueryDialog = freeGenesis.newControl(oFF.UiType.DIALOG);
	this.m_openQueryDialog.setName("OpenQueryDialog");
	this.m_openQueryDialog.setTitle(i18n.getText(oFF.OpenQueryDialogI18n.I18N_OD_TITLE));
	this.m_openQueryDialog.setHeightExt(50, oFF.UiSizeUnit.PERCENT);
	this.m_openQueryDialog.setWidthExt(800, oFF.UiSizeUnit.PIXEL);
	this.m_openQueryDialog.setPaddingCss("20px");
	this.m_openQueryDialog.registerOnBeforeOpen(this);
	this.m_openQueryDialog.registerOnAfterOpen(this);
	this.m_cancelBtn = this.m_openQueryDialog.addNewDialogButton();
	this.m_cancelBtn.setText(i18n.getText(oFF.OlapUiI18n.I18N_CANCEL));
	this.m_cancelBtn.setName("OpenQueryDialogCancelBtn");
	this.m_cancelBtn.registerOnPress(this);
	this.createDialogContent(this.m_openQueryDialog, i18n);
};
oFF.OqdController.prototype.createDialogContent = function(dialog, i18n)
{
	var aMainLayout = dialog.setNewContent(oFF.UiType.FLEX_LAYOUT);
	aMainLayout.setHeightCss("100%");
	aMainLayout.setDirection(oFF.UiFlexDirection.COLUMN);
	var aHeaderLayout = aMainLayout.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	aHeaderLayout.setHeightCss("40px");
	aHeaderLayout.setAlignItems(oFF.UiFlexAlignItems.CENTER);
	aHeaderLayout.setJustifyContent(oFF.UiFlexJustifyContent.SPACE_BETWEEN);
	var aHeaderTitleLabel = aHeaderLayout.addNewItemOfType(oFF.UiType.LABEL);
	aHeaderTitleLabel.setText(i18n.getText(oFF.OpenQueryDialogI18n.I18N_OD_QUERIES));
	aHeaderTitleLabel.setFontSizeCss("20px");
	var aSearchSectionLayout = aHeaderLayout.addNewItemOfType(oFF.UiType.HORIZONTAL_LAYOUT);
	this.m_systemsCombobox = aSearchSectionLayout.addNewItemOfType(oFF.UiType.COMBO_BOX);
	this.m_systemsCombobox.setWidthCss("230px");
	var aSysList = this.m_application.getSystemLandscape().getSystemNames();
	var aMasterName = this.m_application.getSystemLandscape().getMasterSystemName();
	for (var aIndex = 0; aIndex < aSysList.size(); ++aIndex)
	{
		var aSys = aSysList.get(aIndex);
		var aItem = this.m_systemsCombobox.addNewItem();
		aItem.setName(oFF.XString.toLowerCase(aSys));
		aItem.setText(aSys);
		if (oFF.XString.isEqual(aSys, aMasterName))
		{
			this.m_systemsCombobox.setSelectedItem(aItem);
		}
	}
	var aSystemDdSearchSpacer = aSearchSectionLayout.addNewItemOfType(oFF.UiType.SPACER);
	aSystemDdSearchSpacer.setWidthCss("10px");
	this.m_searchInput = aSearchSectionLayout.addNewItemOfType(oFF.UiType.SEARCH_FIELD);
	this.m_searchInput.setWidthCss("230px");
	this.m_searchInput.setPlaceholder(i18n.getText(oFF.OpenQueryDialogI18n.I18N_OD_SEARCH_DESCR_PLACEHOLDER));
	this.m_searchInput.setTooltip(i18n.getText(oFF.OpenQueryDialogI18n.I18N_OD_SEARCH));
	this.m_searchInput.registerOnSearch(this);
	this.m_queryListTable = aMainLayout.addNewItemOfType(oFF.UiType.TABLE);
	this.m_queryListTable.setWidthCss("100%");
	this.m_queryListTable.setHeightCss("100%");
	this.m_queryListTable.setFlex("auto");
	this.m_queryListTable.setVisibleRowCountMode(oFF.UiVisibleRowCountMode.AUTO);
	this.m_queryListTable.setMinRowCount(2);
	this.m_queryListTable.setSelectionBehavior(oFF.UiSelectionBehavior.ROW_ONLY);
	this.m_queryListTable.setSelectionMode(oFF.UiSelectionMode.SINGLE_SELECT);
	this.m_queryListTable.registerOnSelect(this);
	this.m_queryListTable.addNewColumn().setTitle(i18n.getText(oFF.OpenQueryDialogI18n.I18N_OD_KEY));
	this.m_queryListTable.addNewColumn().setTitle(i18n.getText(oFF.OpenQueryDialogI18n.I18N_OD_DESCRIPTION));
};
oFF.OqdController.prototype.releaseObject = function()
{
	this.m_application = null;
	this.m_uiManager = null;
	this.m_listener = null;
	this.m_openQueryDialog = oFF.XObjectExt.release(this.m_openQueryDialog);
	this.m_fullQueryNames = oFF.XObjectExt.release(this.m_fullQueryNames);
	this.m_cancelBtn = oFF.XObjectExt.release(this.m_cancelBtn);
	this.m_systemsCombobox = oFF.XObjectExt.release(this.m_systemsCombobox);
	this.m_queryListTable = oFF.XObjectExt.release(this.m_queryListTable);
	this.m_searchInput = oFF.XObjectExt.release(this.m_searchInput);
	oFF.XObject.prototype.releaseObject.call( this );
};
oFF.OqdController.prototype.isOpen = function()
{
	return this.m_openQueryDialog.isOpen();
};
oFF.OqdController.prototype.open = function()
{
	this.m_openQueryDialog.open();
};
oFF.OqdController.prototype.close = function()
{
	this.m_openQueryDialog.close();
};
oFF.OqdController.prototype.onBeforeOpen = function(event)
{
	this.search();
};
oFF.OqdController.prototype.onAfterOpen = function(event) {};
oFF.OqdController.prototype.onPress = function(event)
{
	this.m_openQueryDialog.close();
	if (oFF.notNull(this.m_listener))
	{
		this.m_listener.onQuerySelectCancel();
	}
};
oFF.OqdController.prototype.onSelect = function(event)
{
	this.m_openQueryDialog.close();
	if (oFF.notNull(this.m_listener))
	{
		var systemName = this.m_systemsCombobox.getSelectedItem().getText();
		var queryName = event.getSelectedItem().getCell(0).getText();
		var fullQueryName = this.m_fullQueryNames.getByKey(queryName);
		this.m_listener.onQuerySelect(systemName, queryName, fullQueryName);
	}
};
oFF.OqdController.prototype.onSearch = function(event)
{
	this.search();
};
oFF.OqdController.prototype.search = function()
{
	var serviceConfig = oFF.OlapCatalogApiModule.SERVICE_TYPE_OLAP_CATALOG.createServiceConfig(this.m_application);
	if (this.m_systemsCombobox.getSelectedItem() === null)
	{
		return;
	}
	this.m_queryListTable.setBusy(true);
	serviceConfig.setSystemName(this.m_systemsCombobox.getSelectedItem().getText());
	serviceConfig.processOlapCatalogManagerCreation(oFF.SyncType.NON_BLOCKING, this, null);
};
oFF.OqdController.prototype.onOlapCatalogManagerCreated = function(extResult, olapCatalogManager, customIdentifier)
{
	if (extResult.hasErrors())
	{
		throw oFF.XException.createRuntimeException(extResult.getSummary());
	}
	var catalogManager = extResult.getData();
	catalogManager.setResultOffset(0);
	catalogManager.setResultMaxSize(10000);
	catalogManager.setSelectedType(oFF.MetaObjectType.QUERY);
	if (this.m_searchInput.getText() !== null && oFF.XString.compare(this.m_searchInput.getText(), "") !== 0)
	{
		catalogManager.setSearchOnText(true);
		catalogManager.setSearchFilter(oFF.XStringUtils.concatenate2(this.m_searchInput.getText(), "*"));
	}
	catalogManager.processGetResult(oFF.SyncType.NON_BLOCKING, this, null);
};
oFF.OqdController.prototype.onOlapCatalogResult = function(extResult, result, customIdentifier)
{
	if (extResult.hasErrors())
	{
		throw oFF.XException.createRuntimeException(extResult.getSummary());
	}
	this.m_queryListTable.clearRows();
	this.m_fullQueryNames.clear();
	var catalogItems = result.getObjectsList();
	for (var i = 0; i < catalogItems.size(); i++)
	{
		var tmpCatalogItem = catalogItems.get(i);
		var aRow = this.m_queryListTable.addNewRow();
		aRow.addNewCell().setText(tmpCatalogItem.getName());
		aRow.addNewCell().setText(tmpCatalogItem.getText());
		this.m_fullQueryNames.put(tmpCatalogItem.getName(), tmpCatalogItem.getFullQualifiedName());
	}
	this.m_queryListTable.setBusy(false);
};

oFF.SuTextEntryDialog = function() {};
oFF.SuTextEntryDialog.prototype = new oFF.XObject();
oFF.SuTextEntryDialog.prototype._ff_c = "SuTextEntryDialog";

oFF.SuTextEntryDialog.createDialog = function(genesis, title, codeType, text, listener)
{
	if (oFF.isNull(genesis))
	{
		throw oFF.XException.createRuntimeException("Cannot create a Chiron dialog instance without a genesis. Please sepcify a genesis!");
	}
	var newDialog = new oFF.SuTextEntryDialog();
	newDialog.setupDialog(genesis, title, codeType, text, listener);
	return newDialog;
};
oFF.SuTextEntryDialog.prototype.m_textEntryDialog = null;
oFF.SuTextEntryDialog.prototype.m_codeEditor = null;
oFF.SuTextEntryDialog.prototype.m_genesis = null;
oFF.SuTextEntryDialog.prototype.m_title = null;
oFF.SuTextEntryDialog.prototype.m_codeType = null;
oFF.SuTextEntryDialog.prototype.m_text = null;
oFF.SuTextEntryDialog.prototype.m_listener = null;
oFF.SuTextEntryDialog.prototype.releaseObject = function()
{
	this.m_codeEditor = oFF.XObjectExt.release(this.m_codeEditor);
	this.m_textEntryDialog = oFF.XObjectExt.release(this.m_textEntryDialog);
	this.m_listener = oFF.XObjectExt.release(this.m_listener);
	this.m_genesis = null;
	oFF.XObject.prototype.releaseObject.call( this );
};
oFF.SuTextEntryDialog.prototype.setupDialog = function(genesis, title, codeType, text, listener)
{
	this.m_genesis = genesis;
	this.m_title = title;
	this.m_codeType = codeType;
	this.m_text = text;
	this.m_listener = listener;
	if (oFF.XStringUtils.isNullOrEmpty(this.m_title))
	{
		this.m_title = "Text entry";
	}
	if (oFF.XStringUtils.isNullOrEmpty(this.m_codeType))
	{
		this.m_codeType = "text";
	}
	this.buildDialogUi(this.m_genesis);
};
oFF.SuTextEntryDialog.prototype.buildDialogUi = function(genesis)
{
	this.m_textEntryDialog = this.m_genesis.newControl(oFF.UiType.DIALOG);
	this.m_textEntryDialog.setName("chironTextEntryDialog");
	this.m_textEntryDialog.setTitle(this.m_title);
	this.m_textEntryDialog.setWidthCss("70vw");
	this.m_textEntryDialog.setHeightCss("60vh");
	this.m_textEntryDialog.setPaddingCss("20px");
	this.m_textEntryDialog.registerOnAfterOpen(this);
	var closeDialogBtn = this.m_textEntryDialog.addNewDialogButton();
	closeDialogBtn.setName("closeTextEntryDialogBtn");
	closeDialogBtn.setText("Close");
	closeDialogBtn.registerOnPress(this);
	var applyDialogBtn = this.m_textEntryDialog.addNewDialogButton();
	applyDialogBtn.setName("applyTextEntryDialogBtn");
	applyDialogBtn.setText("Apply");
	applyDialogBtn.setButtonType(oFF.UiButtonType.PRIMARY);
	applyDialogBtn.registerOnPress(this);
	this.m_codeEditor = this.m_textEntryDialog.setNewContent(oFF.UiType.CODE_EDITOR);
	this.m_codeEditor.setName("textEntryDialogCodeEditor");
	this.m_codeEditor.setWidthCss("100%");
	this.m_codeEditor.setHeightCss("100%");
	this.m_codeEditor.setCodeType(this.m_codeType);
	this.m_codeEditor.setText(this.m_text);
};
oFF.SuTextEntryDialog.prototype.openDialog = function()
{
	this.m_textEntryDialog.open();
};
oFF.SuTextEntryDialog.prototype.onPress = function(event)
{
	var name = event.getControl().getName();
	if (oFF.XString.isEqual("closeTextEntryDialogBtn", name))
	{
		this.m_textEntryDialog.close();
		if (oFF.notNull(this.m_listener))
		{
			this.m_listener.onTextEntryCancel();
		}
	}
	if (oFF.XString.isEqual("applyTextEntryDialogBtn", name))
	{
		this.m_textEntryDialog.close();
		if (oFF.notNull(this.m_listener))
		{
			this.m_listener.onTextEntryFinished(this.m_codeEditor.getText());
		}
	}
};
oFF.SuTextEntryDialog.prototype.onAfterOpen = function(event)
{
	this.m_codeEditor.focus();
};

oFF.FilterDialogProgramLayout = function() {};
oFF.FilterDialogProgramLayout.prototype = new oFF.XObject();
oFF.FilterDialogProgramLayout.prototype._ff_c = "FilterDialogProgramLayout";

oFF.FilterDialogProgramLayout.create = function(genesis, toolbar, onPressListener, onSelectListener)
{
	var layout = new oFF.FilterDialogProgramLayout();
	layout.m_genesis = genesis;
	layout.m_toolbar = toolbar;
	layout.m_onPressListener = onPressListener;
	layout.m_onSelectListener = onSelectListener;
	return layout;
};
oFF.FilterDialogProgramLayout.prototype.m_genesis = null;
oFF.FilterDialogProgramLayout.prototype.m_toolbar = null;
oFF.FilterDialogProgramLayout.prototype.m_onPressListener = null;
oFF.FilterDialogProgramLayout.prototype.m_onSelectListener = null;
oFF.FilterDialogProgramLayout.prototype.m_changeDataSourceBtn = null;
oFF.FilterDialogProgramLayout.prototype.m_editToggleBtn = null;
oFF.FilterDialogProgramLayout.prototype.m_setVariablesBtn = null;
oFF.FilterDialogProgramLayout.prototype.m_openFilterDialogBtn = null;
oFF.FilterDialogProgramLayout.prototype.m_dataObjectDimensionRadioBtn = null;
oFF.FilterDialogProgramLayout.prototype.m_dataObjectVariableRadioBtn = null;
oFF.FilterDialogProgramLayout.prototype.m_dimensionDropdown = null;
oFF.FilterDialogProgramLayout.prototype.m_variableDropdown = null;
oFF.FilterDialogProgramLayout.prototype.m_hierarchyInput = null;
oFF.FilterDialogProgramLayout.prototype.m_entryPointDefaultRadioBtn = null;
oFF.FilterDialogProgramLayout.prototype.m_entryPointSacRadioBtn = null;
oFF.FilterDialogProgramLayout.prototype.m_useDynamicFilterCheckbox = null;
oFF.FilterDialogProgramLayout.prototype.m_displayInfoDropdown = null;
oFF.FilterDialogProgramLayout.prototype.m_pageSizeInput = null;
oFF.FilterDialogProgramLayout.prototype.m_multiSelectionModeCheckbox = null;
oFF.FilterDialogProgramLayout.prototype.m_nonBlockingCheckbox = null;
oFF.FilterDialogProgramLayout.prototype.m_selectionTextArea = null;
oFF.FilterDialogProgramLayout.prototype.m_outputTextArea = null;
oFF.FilterDialogProgramLayout.prototype.m_featureToggleReadMode = null;
oFF.FilterDialogProgramLayout.prototype.releaseObject = function()
{
	oFF.XObject.prototype.releaseObject.call( this );
	this.m_genesis = null;
	this.m_toolbar = null;
	this.m_onPressListener = null;
	this.m_onSelectListener = null;
	this.m_changeDataSourceBtn = oFF.XObjectExt.release(this.m_changeDataSourceBtn);
	this.m_editToggleBtn = oFF.XObjectExt.release(this.m_editToggleBtn);
	this.m_setVariablesBtn = oFF.XObjectExt.release(this.m_setVariablesBtn);
	this.m_openFilterDialogBtn = oFF.XObjectExt.release(this.m_openFilterDialogBtn);
	this.m_dimensionDropdown = oFF.XObjectExt.release(this.m_dimensionDropdown);
	this.m_variableDropdown = oFF.XObjectExt.release(this.m_variableDropdown);
	this.m_dataObjectDimensionRadioBtn = oFF.XObjectExt.release(this.m_dataObjectDimensionRadioBtn);
	this.m_dataObjectVariableRadioBtn = oFF.XObjectExt.release(this.m_dataObjectVariableRadioBtn);
	this.m_hierarchyInput = oFF.XObjectExt.release(this.m_hierarchyInput);
	this.m_entryPointDefaultRadioBtn = oFF.XObjectExt.release(this.m_entryPointDefaultRadioBtn);
	this.m_entryPointSacRadioBtn = oFF.XObjectExt.release(this.m_entryPointSacRadioBtn);
	this.m_useDynamicFilterCheckbox = oFF.XObjectExt.release(this.m_useDynamicFilterCheckbox);
	this.m_displayInfoDropdown = oFF.XObjectExt.release(this.m_displayInfoDropdown);
	this.m_pageSizeInput = oFF.XObjectExt.release(this.m_pageSizeInput);
	this.m_multiSelectionModeCheckbox = oFF.XObjectExt.release(this.m_multiSelectionModeCheckbox);
	this.m_nonBlockingCheckbox = oFF.XObjectExt.release(this.m_nonBlockingCheckbox);
	this.m_selectionTextArea = oFF.XObjectExt.release(this.m_selectionTextArea);
	this.m_outputTextArea = oFF.XObjectExt.release(this.m_outputTextArea);
	this.m_featureToggleReadMode = oFF.XObjectExt.release(this.m_featureToggleReadMode);
};
oFF.FilterDialogProgramLayout.prototype.showActivityIndicator = function()
{
	this.m_genesis.clearUi();
	this.m_genesis.newRoot(oFF.UiType.ACTIVITY_INDICATOR).useMaxSpace();
};
oFF.FilterDialogProgramLayout.prototype.showErrorToast = function(message)
{
	var toast = this.m_genesis.newControl(oFF.UiType.TOAST);
	toast.setText(message);
	toast.setMessageType(oFF.UiMessageType.ERROR);
	toast.open();
};
oFF.FilterDialogProgramLayout.prototype.showUi = function(queryManager, queryText, dimension, hierarchy, variable)
{
	this.m_genesis.clearUi();
	this.setupToolbar(queryManager, queryText);
	var root = this.m_genesis.newControl(oFF.UiType.FLEX_LAYOUT);
	root.setDirection(oFF.UiFlexDirection.COLUMN);
	this.m_genesis.setRoot(root);
	root.addNewItemOfType(oFF.UiType.SPACER).setHeightCss("5px");
	this.m_openFilterDialogBtn = root.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_openFilterDialogBtn.setName("openBtn").setText("Open Filter Dialog").setButtonType(oFF.UiButtonType.PRIMARY);
	this.m_openFilterDialogBtn.registerOnPress(this.m_onPressListener);
	root.addNewItemOfType(oFF.UiType.SPACER).setHeightCss("5px");
	var configLayout = root.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	configLayout.setDirection(oFF.UiFlexDirection.ROW);
	configLayout.setJustifyContent(oFF.UiFlexJustifyContent.SPACE_BETWEEN);
	configLayout.setPaddingCss("5px");
	configLayout.setFlex("1 0 auto");
	this.setupLeftLayout(configLayout, queryManager, dimension, hierarchy, variable);
	configLayout.addNewItemOfType(oFF.UiType.SPACER).setWidthCss("20px");
	this.setupRightLayout(configLayout);
};
oFF.FilterDialogProgramLayout.prototype.setupToolbar = function(queryManager, queryText)
{
	this.m_toolbar.clearItems();
	this.m_changeDataSourceBtn = this.m_toolbar.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_changeDataSourceBtn.setName("changeDataSourceBtn").setText(queryText);
	this.m_changeDataSourceBtn.registerOnPress(this.m_onPressListener);
	this.m_editToggleBtn = this.m_toolbar.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_editToggleBtn.setName("editTogglesBtn").setText("Edit Feature Toggles");
	this.m_editToggleBtn.registerOnPress(this.m_onPressListener);
	this.m_setVariablesBtn = this.m_toolbar.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_setVariablesBtn.setName("setVariablesBtn").setText("Set variables");
	this.m_setVariablesBtn.registerOnPress(this.m_onPressListener);
	this.m_setVariablesBtn.setEnabled(queryManager.hasVariables());
};
oFF.FilterDialogProgramLayout.prototype.setupLeftLayout = function(parent, queryManager, dimension, hierarchy, variable)
{
	var left = parent.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	left.setDirection(oFF.UiFlexDirection.COLUMN);
	left.setWidthCss("35%");
	this.addSectionLabel(left, "Data Object", false);
	var hasVariables = oFF.notNull(queryManager) && queryManager.hasVariables();
	var dataObjectGroup = left.addNewItemOfType(oFF.UiType.RADIO_BUTTON_GROUP);
	dataObjectGroup.setColumnCount(2);
	this.m_dataObjectDimensionRadioBtn = dataObjectGroup.addNewRadioButton();
	this.m_dataObjectDimensionRadioBtn.setName("dataObjectDimension").setText("Dimension");
	this.m_dataObjectDimensionRadioBtn.registerOnChange(this);
	this.m_dataObjectDimensionRadioBtn.setSelected(oFF.XStringUtils.isNotNullAndNotEmpty(dimension) || !hasVariables || oFF.XStringUtils.isNullOrEmpty(variable));
	this.m_dimensionDropdown = this.createItem(left, "Dimension", oFF.UiType.DROPDOWN);
	this.m_dimensionDropdown.registerOnSelect(this.m_onSelectListener);
	this.m_dimensionDropdown.getParent().setVisible(this.m_dataObjectDimensionRadioBtn.isSelected());
	this.fillDimensionDropdown(queryManager, dimension);
	this.m_hierarchyInput = this.createItem(left, "Hierarchy", oFF.UiType.INPUT);
	this.m_hierarchyInput.setText(hierarchy);
	this.m_hierarchyInput.getParent().setVisible(this.m_dataObjectDimensionRadioBtn.isSelected());
	this.m_dataObjectVariableRadioBtn = dataObjectGroup.addNewRadioButton();
	this.m_dataObjectVariableRadioBtn.setName("dataObjectVariable").setText("Variable");
	this.m_dataObjectVariableRadioBtn.registerOnChange(this);
	this.m_dataObjectVariableRadioBtn.setEnabled(hasVariables);
	if (!this.m_dataObjectDimensionRadioBtn.isSelected())
	{
		this.m_dataObjectVariableRadioBtn.setSelected(true);
	}
	this.m_variableDropdown = this.createItem(left, "Variable", oFF.UiType.DROPDOWN);
	this.m_variableDropdown.registerOnSelect(this.m_onSelectListener);
	this.m_variableDropdown.getParent().setVisible(this.m_dataObjectVariableRadioBtn.isSelected());
	this.fillVariableDropdown(queryManager, variable);
	this.addSectionLabel(left, "Entry Point", true);
	var entryPointGroup = left.addNewItemOfType(oFF.UiType.RADIO_BUTTON_GROUP);
	entryPointGroup.setColumnCount(2);
	this.m_entryPointDefaultRadioBtn = entryPointGroup.addNewRadioButton();
	this.m_entryPointDefaultRadioBtn.setName("entryPointDefault").setText("Default");
	this.m_entryPointDefaultRadioBtn.registerOnChange(this);
	this.m_entryPointDefaultRadioBtn.setSelected(true);
	this.m_useDynamicFilterCheckbox = this.createItem(left, "Use Dynamic Filter", oFF.UiType.CHECKBOX);
	this.m_entryPointSacRadioBtn = entryPointGroup.addNewRadioButton();
	this.m_entryPointSacRadioBtn.setName("entryPointSac").setText("SAC");
	this.m_entryPointSacRadioBtn.registerOnChange(this);
	this.addSectionLabel(left, "Filter Dialog Configuration", true);
	this.m_displayInfoDropdown = this.createItem(left, "Display Info", oFF.UiType.DROPDOWN);
	this.m_displayInfoDropdown.addNewItem().setText("Dimension default");
	this.m_displayInfoDropdown.addNewItem().setText("Description").setCustomObject(oFF.FdDimensionDisplayInfo.DESCRIPTION);
	this.m_displayInfoDropdown.addNewItem().setText("ID").setCustomObject(oFF.FdDimensionDisplayInfo.ID);
	this.m_displayInfoDropdown.addNewItem().setText("ID and Description").setCustomObject(oFF.FdDimensionDisplayInfo.ID_AND_DESCRIPTION);
	this.m_pageSizeInput = this.createItem(left, "Page Size", oFF.UiType.INPUT);
	this.m_pageSizeInput.setText(oFF.XInteger.convertToString(oFF.FdConfiguration.DEFAULT_PAGE_SIZE));
	this.m_multiSelectionModeCheckbox = this.createItem(left, "MultiSelect", oFF.UiType.CHECKBOX).setChecked(true);
	this.m_nonBlockingCheckbox = this.createItem(left, "NonBlocking", oFF.UiType.CHECKBOX);
	this.m_featureToggleReadMode = this.createItem(left, "ReadModeSwitch", oFF.UiType.CHECKBOX).setChecked(true);
};
oFF.FilterDialogProgramLayout.prototype.addSectionLabel = function(left, label, showSpacer)
{
	if (showSpacer)
	{
		left.addNewItemOfType(oFF.UiType.SPACER);
	}
	left.addNewItemOfType(oFF.UiType.LABEL).setText(label).setFontWeight(oFF.UiFontWeight.BOLD).setHeightCss("20px");
};
oFF.FilterDialogProgramLayout.prototype.createItem = function(parent, name, type)
{
	var container = parent.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	container.setDirection(oFF.UiFlexDirection.ROW);
	container.setAlignItems(oFF.UiFlexAlignItems.CENTER);
	container.addNewItemOfType(oFF.UiType.LABEL).setText(name).setWidthCss("180px");
	return container.addNewItemOfType(type).useMaxWidth().setName(oFF.XString.replace(name, " ", ""));
};
oFF.FilterDialogProgramLayout.prototype.fillDimensionDropdown = function(queryManager, dimensionName)
{
	this.m_dimensionDropdown.clearItems();
	if (oFF.notNull(queryManager))
	{
		var dimensions = queryManager.getDimensionAccessor().getDimensions();
		for (var i = 0; i < dimensions.size(); i++)
		{
			var dimension = dimensions.get(i);
			if (!dimension.isUniversalDisplayHierarchyDimension())
			{
				this.m_dimensionDropdown.addNewItem().setName(dimension.getName()).setText(dimension.getName());
			}
		}
		var dim = dimensionName;
		if (oFF.XStringUtils.isNullOrEmpty(dim) || queryManager.getDimensionAccessor().getDimensionByName(dim) === null)
		{
			dim = dimensions.get(0).getName();
		}
		this.m_dimensionDropdown.setSelectedName(dim);
	}
};
oFF.FilterDialogProgramLayout.prototype.fillVariableDropdown = function(queryManager, variableName)
{
	this.m_variableDropdown.clearItems();
	if (oFF.notNull(queryManager) && queryManager.hasVariables())
	{
		var variables = queryManager.getInputEnabledAndNonTechnicalVariables();
		for (var i = 0; i < variables.size(); i++)
		{
			var variable = variables.get(i);
			this.m_variableDropdown.addNewItem().setName(variable.getName()).setText(variable.getName());
		}
		var _var = variableName;
		if (oFF.XStringUtils.isNullOrEmpty(_var) || queryManager.getVariable(_var) === null)
		{
			_var = variables.get(0).getName();
		}
		this.m_variableDropdown.setSelectedName(_var);
	}
};
oFF.FilterDialogProgramLayout.prototype.onChange = function(event)
{
	this.m_useDynamicFilterCheckbox.getParent().setVisible(this.m_entryPointDefaultRadioBtn.isSelected());
	this.m_dimensionDropdown.getParent().setVisible(this.m_dataObjectDimensionRadioBtn.isSelected());
	this.m_hierarchyInput.getParent().setVisible(this.m_dataObjectDimensionRadioBtn.isSelected());
	this.m_variableDropdown.getParent().setVisible(this.m_dataObjectVariableRadioBtn.isSelected());
	this.m_displayInfoDropdown.getParent().setVisible(!this.m_entryPointSacRadioBtn.isSelected());
	this.m_pageSizeInput.getParent().setVisible(!this.m_entryPointSacRadioBtn.isSelected());
	this.m_multiSelectionModeCheckbox.getParent().setVisible(!this.m_entryPointSacRadioBtn.isSelected());
};
oFF.FilterDialogProgramLayout.prototype.setupRightLayout = function(parent)
{
	var right = parent.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	right.setDirection(oFF.UiFlexDirection.COLUMN);
	right.setWidthCss("65%");
	var textArea1Container = right.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	textArea1Container.setDirection(oFF.UiFlexDirection.COLUMN);
	textArea1Container.setFlex("1 1 auto");
	textArea1Container.addNewItemOfType(oFF.UiType.LABEL).setText("Selection:").setHeightCss("20px");
	this.m_selectionTextArea = textArea1Container.addNewItemOfType(oFF.UiType.TEXT_AREA);
	this.m_selectionTextArea.setName("SelectionData");
	this.m_selectionTextArea.setBackgroundColor(oFF.UiColor.WHITE);
	this.m_selectionTextArea.setSizeCss("100%", "100%");
	right.addNewItemOfType(oFF.UiType.SPACER);
	var textArea2Container = right.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	textArea2Container.setDirection(oFF.UiFlexDirection.COLUMN);
	textArea2Container.setFlex("4 1 auto");
	textArea2Container.addNewItemOfType(oFF.UiType.LABEL).setText("Output:").setHeightCss("20px");
	this.m_outputTextArea = textArea2Container.addNewItemOfType(oFF.UiType.TEXT_AREA);
	this.m_outputTextArea.setName("OutputData");
	this.m_outputTextArea.setBackgroundColor(oFF.UiColor.WHITE);
	this.m_outputTextArea.setSizeCss("100%", "100%");
};
oFF.FilterDialogProgramLayout.prototype.showChangeDataSourceButton = function()
{
	this.m_genesis.clearUi();
	this.m_changeDataSourceBtn = this.m_genesis.newControl(oFF.UiType.BUTTON);
	this.m_changeDataSourceBtn.setName("changeDataSourceBtn").setText("Change data source").useMaxSpace();
	this.m_changeDataSourceBtn.registerOnPress(this.m_onPressListener);
	this.m_genesis.setRoot(this.m_changeDataSourceBtn);
};
oFF.FilterDialogProgramLayout.prototype.getOpenFilterDialogBtn = function()
{
	return this.m_openFilterDialogBtn;
};
oFF.FilterDialogProgramLayout.prototype.getChangeDataSourceBtn = function()
{
	return this.m_changeDataSourceBtn;
};
oFF.FilterDialogProgramLayout.prototype.getFeatureTogglesBtn = function()
{
	return this.m_editToggleBtn;
};
oFF.FilterDialogProgramLayout.prototype.getSetVariablesBtn = function()
{
	return this.m_setVariablesBtn;
};
oFF.FilterDialogProgramLayout.prototype.getDataObjectDimensionRadioBtn = function()
{
	return this.m_dataObjectDimensionRadioBtn;
};
oFF.FilterDialogProgramLayout.prototype.getDataObjectVariableRadioBtn = function()
{
	return this.m_dataObjectVariableRadioBtn;
};
oFF.FilterDialogProgramLayout.prototype.getDimensionDropdown = function()
{
	return this.m_dimensionDropdown;
};
oFF.FilterDialogProgramLayout.prototype.getVariableDropdown = function()
{
	return this.m_variableDropdown;
};
oFF.FilterDialogProgramLayout.prototype.getHierarchyInput = function()
{
	return this.m_hierarchyInput;
};
oFF.FilterDialogProgramLayout.prototype.getDisplayInfoDropdown = function()
{
	return this.m_displayInfoDropdown;
};
oFF.FilterDialogProgramLayout.prototype.getPageSizeInput = function()
{
	return this.m_pageSizeInput;
};
oFF.FilterDialogProgramLayout.prototype.getMultiSelectionModeCheckbox = function()
{
	return this.m_multiSelectionModeCheckbox;
};
oFF.FilterDialogProgramLayout.prototype.getNonBlockingCheckbox = function()
{
	return this.m_nonBlockingCheckbox;
};
oFF.FilterDialogProgramLayout.prototype.getUseDynamicFilterCheckbox = function()
{
	return this.m_useDynamicFilterCheckbox;
};
oFF.FilterDialogProgramLayout.prototype.getEntryPointDefaultRadioBtn = function()
{
	return this.m_entryPointDefaultRadioBtn;
};
oFF.FilterDialogProgramLayout.prototype.getEntryPointSacRadioBtn = function()
{
	return this.m_entryPointSacRadioBtn;
};
oFF.FilterDialogProgramLayout.prototype.getSelectionTextArea = function()
{
	return this.m_selectionTextArea;
};
oFF.FilterDialogProgramLayout.prototype.getOutputTextArea = function()
{
	return this.m_outputTextArea;
};
oFF.FilterDialogProgramLayout.prototype.getFeatureToggleReadMode = function()
{
	return this.m_featureToggleReadMode;
};

oFF.PressListenerLambda = function() {};
oFF.PressListenerLambda.prototype = new oFF.XObject();
oFF.PressListenerLambda.prototype._ff_c = "PressListenerLambda";

oFF.PressListenerLambda.create = function(procedure)
{
	var obj = new oFF.PressListenerLambda();
	obj.m_onPress = procedure;
	return obj;
};
oFF.PressListenerLambda.prototype.m_onPress = null;
oFF.PressListenerLambda.prototype.onPress = function(event)
{
	this.m_onPress();
};

oFF.ScAtlasDashboardView = function() {};
oFF.ScAtlasDashboardView.prototype = new oFF.XObject();
oFF.ScAtlasDashboardView.prototype._ff_c = "ScAtlasDashboardView";

oFF.ScAtlasDashboardView.createDashboardView = function(genesis, application, story, widgetIdsList, name)
{
	if (oFF.isNull(genesis))
	{
		throw oFF.XException.createRuntimeException("You need to specify a genesis instance in order to create a Atlas Dashboard View!");
	}
	if (oFF.isNull(application))
	{
		throw oFF.XException.createRuntimeException("You need to specify a application instance in order to create a Atlas Dashboard View!");
	}
	if (oFF.isNull(story))
	{
		var errorMsg = "Missing story. Cannot create Atlas Dashboard View!";
		genesis.showErrorToast(errorMsg);
		throw oFF.XException.createRuntimeException(errorMsg);
	}
	var newUiControlsView = new oFF.ScAtlasDashboardView();
	newUiControlsView.setupInternal(genesis, application, story, widgetIdsList, name);
	return newUiControlsView;
};
oFF.ScAtlasDashboardView.prototype.m_genesis = null;
oFF.ScAtlasDashboardView.prototype.m_story = null;
oFF.ScAtlasDashboardView.prototype.m_application = null;
oFF.ScAtlasDashboardView.prototype.m_widgetIdsList = null;
oFF.ScAtlasDashboardView.prototype.m_dashboardName = null;
oFF.ScAtlasDashboardView.prototype.m_viewPage = null;
oFF.ScAtlasDashboardView.prototype.m_flexLayout = null;
oFF.ScAtlasDashboardView.prototype.releaseObject = function()
{
	oFF.XObject.prototype.releaseObject.call( this );
	this.m_genesis = null;
	this.m_application = null;
	this.m_story = null;
	this.m_widgetIdsList = null;
	this.m_viewPage = oFF.XObjectExt.release(this.m_viewPage);
};
oFF.ScAtlasDashboardView.prototype.setupInternal = function(genesis, application, story, widgetIdsList, name)
{
	this.m_genesis = genesis;
	this.m_application = application;
	this.m_story = story;
	this.m_widgetIdsList = widgetIdsList;
	this.m_dashboardName = name;
	this.createView(genesis);
};
oFF.ScAtlasDashboardView.prototype.getPage = function()
{
	return this.m_viewPage;
};
oFF.ScAtlasDashboardView.prototype.createView = function(genesis)
{
	this.m_viewPage = genesis.newControl(oFF.UiType.PAGE);
	this.m_viewPage.setName("scAtlasDashboardViewPage");
	this.m_viewPage.setShowHeader(true);
	this.m_viewPage.setText(oFF.XStringUtils.isNotNullAndNotEmpty(this.m_dashboardName) ? this.m_dashboardName : this.m_story.getName());
	this.m_viewPage.useMaxSpace();
	this.m_flexLayout = this.m_viewPage.setNewContent(oFF.UiType.FLEX_LAYOUT);
	this.m_viewPage.setName("scAtlasDashboardViewTileContainer");
	this.m_flexLayout.setPadding(oFF.UiUnitValue.createByCss("10px"));
	this.m_flexLayout.useMaxSpace();
	this.renderDashboard();
};
oFF.ScAtlasDashboardView.prototype.renderDashboard = function()
{
	var quasarStory = oFF.OcQuasarStory.create(this.m_story);
	quasarStory.setQuasarChartType(oFF.OcChartType.MICRO_CHART);
	var messages = quasarStory.getMessages();
	if (messages.hasErrors())
	{
		var error = messages.getFirstError();
		this.m_genesis.showErrorToast(error.getText());
	}
	else if (messages.getMessages().hasElements())
	{
		var firstWarning = messages.getFirstWithSeverity(oFF.Severity.WARNING);
		if (oFF.notNull(firstWarning))
		{
			this.m_genesis.showWarningToast(firstWarning.getText());
		}
	}
	if (oFF.notNull(this.m_widgetIdsList) && this.m_widgetIdsList.size() > 0)
	{
		var widgetsIterator = this.m_widgetIdsList.getIterator();
		while (widgetsIterator.hasNext())
		{
			var widgetId = widgetsIterator.next();
			var widgetDef = quasarStory.getQuasarWidgetDocument(widgetId);
			if (oFF.notNull(widgetDef))
			{
				var tmpDashboardTile = this.m_flexLayout.addNewItemOfType(oFF.UiType.TILE);
				tmpDashboardTile.setTitle(this.m_story.getName());
				tmpDashboardTile.setSubtitle(widgetId);
				tmpDashboardTile.setMargin(oFF.UiUnitValue.createByCss("10px"));
				var tmpQsaEngine = oFF.QuasarEngine.create(this.m_application);
				var tmpQuasarGeneis = oFF.UiGenesis.create(tmpDashboardTile, oFF.UiPosition.CONTENT, oFF.UiOperation.SET, 0, 0);
				tmpQsaEngine.setDocument(widgetDef);
				tmpQsaEngine.renderUi(tmpQuasarGeneis);
			}
		}
	}
	else
	{
		var errorText = this.m_viewPage.setNewContent(oFF.UiType.TEXT);
		errorText.setText("No widgets found!");
		errorText.useMaxSpace();
		errorText.setBackgroundColor(oFF.UiColor.createByString("#cc0033"));
		errorText.setFontColor(oFF.UiColor.createByString("#ffffff"));
		errorText.setFontSizeValue(15);
	}
};
oFF.ScAtlasDashboardView.prototype.onSelect = function(event) {};
oFF.ScAtlasDashboardView.prototype.onLiveChange = function(event) {};
oFF.ScAtlasDashboardView.prototype.onSearch = function(event) {};
oFF.ScAtlasDashboardView.prototype.onPress = function(event)
{
	this.m_genesis.showInfoToast("Works!");
};

oFF.ScAtlasStoryListView = function() {};
oFF.ScAtlasStoryListView.prototype = new oFF.XObject();
oFF.ScAtlasStoryListView.prototype._ff_c = "ScAtlasStoryListView";

oFF.ScAtlasStoryListView.createStoryListView = function(genesis, storyCatalog, listener)
{
	if (oFF.isNull(genesis))
	{
		throw oFF.XException.createRuntimeException("You need to specify a genesis instance in order to create a Atlas Story List View!");
	}
	if (oFF.isNull(storyCatalog))
	{
		var errorMsg = "Missing story catalog. Cannot create Atlas Story List View!";
		genesis.showErrorToast(errorMsg);
		throw oFF.XException.createRuntimeException(errorMsg);
	}
	var newUiControlsView = new oFF.ScAtlasStoryListView();
	newUiControlsView.setupInternal(genesis, storyCatalog, listener);
	return newUiControlsView;
};
oFF.ScAtlasStoryListView.prototype.m_genesis = null;
oFF.ScAtlasStoryListView.prototype.m_storyCatalog = null;
oFF.ScAtlasStoryListView.prototype.m_viewPage = null;
oFF.ScAtlasStoryListView.prototype.m_storyList = null;
oFF.ScAtlasStoryListView.prototype.m_storySearchField = null;
oFF.ScAtlasStoryListView.prototype.m_allStoryListItems = null;
oFF.ScAtlasStoryListView.prototype.m_storyCatalogItemSelectListener = null;
oFF.ScAtlasStoryListView.prototype.releaseObject = function()
{
	oFF.XObject.prototype.releaseObject.call( this );
	this.m_genesis = null;
	this.m_storyCatalog = null;
	this.m_storyCatalogItemSelectListener = null;
	this.m_storySearchField = oFF.XObjectExt.release(this.m_storySearchField);
	if (oFF.notNull(this.m_allStoryListItems))
	{
		this.m_allStoryListItems.clear();
		this.m_allStoryListItems = oFF.XObjectExt.release(this.m_allStoryListItems);
	}
	this.m_storyList = oFF.XObjectExt.release(this.m_storyList);
	this.m_viewPage = oFF.XObjectExt.release(this.m_viewPage);
};
oFF.ScAtlasStoryListView.prototype.setupInternal = function(genesis, storyCatalog, listener)
{
	this.m_genesis = genesis;
	this.m_storyCatalog = storyCatalog;
	this.m_storyCatalogItemSelectListener = listener;
	this.m_allStoryListItems = oFF.XList.create();
	this.createView(genesis);
};
oFF.ScAtlasStoryListView.prototype.createView = function(genesis)
{
	this.m_viewPage = genesis.newControl(oFF.UiType.PAGE);
	this.m_viewPage.setName("scAtlasStoryListViewPage");
	this.m_viewPage.setShowHeader(true);
	this.m_viewPage.setText("All stories");
	this.m_viewPage.useMaxSpace();
	this.m_storySearchField = this.m_viewPage.setNewSubHeader(oFF.UiType.SEARCH_FIELD);
	this.m_storySearchField.setName("scAtlasStoryListViewSearchField");
	this.m_storySearchField.setPlaceholder("Search story...");
	this.m_storySearchField.registerOnSearch(this);
	this.m_storySearchField.registerOnLiveChange(this);
	this.m_storySearchField.setDebounceTime(1000);
	var refreshAction = this.m_viewPage.addNewPageButton();
	refreshAction.setName("scAtlasStoryListViewPageRefreshList");
	refreshAction.setText("Refresh");
	refreshAction.setIcon("refresh");
	refreshAction.registerOnPress(this);
	var favoritesAction = this.m_viewPage.addNewPageButton();
	favoritesAction.setName("scAtlasStoryListViewPageGetFavorites");
	favoritesAction.setText("Favorites");
	favoritesAction.setIcon("favorite");
	favoritesAction.registerOnPress(this);
	this.m_storyList = this.m_viewPage.setNewContent(oFF.UiType.LIST);
	this.m_storyList.setName("scAtlasStoryListViewStoryList");
	this.m_storyList.setSelectionMode(oFF.UiSelectionMode.NONE);
	this.m_storyList.useMaxSpace();
	this.fillStoryList();
	this.m_genesis.showInfoToast("Story catalog loaded!");
};
oFF.ScAtlasStoryListView.prototype.getPage = function()
{
	return this.m_viewPage;
};
oFF.ScAtlasStoryListView.prototype.fillStoryList = function()
{
	if (oFF.notNull(this.m_storyList))
	{
		this.m_storyList.clearItems();
		this.m_allStoryListItems.clear();
		var iterator = this.m_storyCatalog.getCatalogItems().getIterator();
		while (iterator.hasNext())
		{
			var tmpStory = iterator.next();
			var desc = tmpStory.getDescription();
			var modifiedBy = tmpStory.getModifiedByDisplayName();
			if (oFF.XStringUtils.isNullOrEmpty(modifiedBy))
			{
				modifiedBy = tmpStory.getModifiedBy();
			}
			var modify = oFF.XStringUtils.concatenate2(oFF.XStringUtils.concatenate2("Modified: ", tmpStory.getModifiedTime()), oFF.XStringUtils.concatenate2(" by ", modifiedBy));
			var fullDesc = oFF.XStringUtils.concatenate3(modify, "\n", desc);
			var listItem = this.m_storyList.addNewItem();
			listItem.setText(tmpStory.getName());
			listItem.setListItemType(oFF.UiListType.NAVIGATION);
			listItem.registerOnPress(this);
			listItem.setDescription(fullDesc);
			listItem.setCustomObject(tmpStory);
			listItem.setIcon("business-objects-experience");
			this.m_allStoryListItems.add(listItem);
		}
	}
};
oFF.ScAtlasStoryListView.prototype.filterStoryList = function(searchText, clearButtonPressed)
{
	if (oFF.notNull(this.m_storyList))
	{
		this.m_storyList.clearItems();
		if (clearButtonPressed === false)
		{
			for (var a = 0; a < this.m_allStoryListItems.size(); a++)
			{
				var tmpListItem = this.m_allStoryListItems.get(a);
				if (oFF.XString.containsString(oFF.XString.toLowerCase(tmpListItem.getText()), oFF.XString.toLowerCase(searchText)))
				{
					this.m_storyList.addItem(tmpListItem);
				}
			}
		}
		else
		{
			this.m_storyList.addAllItems(this.m_allStoryListItems);
		}
	}
};
oFF.ScAtlasStoryListView.prototype.onSelect = function(event) {};
oFF.ScAtlasStoryListView.prototype.onLiveChange = function(event)
{
	if (event.getControl() === this.m_storySearchField)
	{
		this.filterStoryList(event.getControl().getText(), false);
	}
};
oFF.ScAtlasStoryListView.prototype.onSearch = function(event)
{
	var didPressClearButton = event.getParameters().getBooleanByKeyExt(oFF.UiControlEvent.PARAM_CLEAR_BUTTON_PRESSED, false);
	var searchText = event.getParameters().getStringByKeyExt(oFF.UiControlEvent.PARAM_SEARCH_TEXT, "");
	this.filterStoryList(searchText, didPressClearButton);
};
oFF.ScAtlasStoryListView.prototype.onPress = function(event)
{
	var storyCatalogItem = event.getControl().getCustomObject();
	if (oFF.notNull(this.m_storyCatalogItemSelectListener) && oFF.notNull(storyCatalogItem))
	{
		this.m_storyCatalogItemSelectListener.onStoryCatalogItemSelected(storyCatalogItem);
	}
};

oFF.ScAtlasStoryView = function() {};
oFF.ScAtlasStoryView.prototype = new oFF.XObject();
oFF.ScAtlasStoryView.prototype._ff_c = "ScAtlasStoryView";

oFF.ScAtlasStoryView.createStoryView = function(genesis, application, story, layoutType, chartType)
{
	if (oFF.isNull(genesis))
	{
		throw oFF.XException.createRuntimeException("You need to specify a genesis instance in order to create a Atlas Story View!");
	}
	if (oFF.isNull(application))
	{
		throw oFF.XException.createRuntimeException("You need to specify a application instance in order to create a Atlas Story View!");
	}
	if (oFF.isNull(story))
	{
		var errorMsg = "Missing story. Cannot create Atlas Story View!";
		genesis.showErrorToast(errorMsg);
		throw oFF.XException.createRuntimeException(errorMsg);
	}
	var newUiControlsView = new oFF.ScAtlasStoryView();
	newUiControlsView.setupInternal(genesis, application, story, layoutType, chartType);
	return newUiControlsView;
};
oFF.ScAtlasStoryView.prototype.m_genesis = null;
oFF.ScAtlasStoryView.prototype.m_story = null;
oFF.ScAtlasStoryView.prototype.m_layoutType = null;
oFF.ScAtlasStoryView.prototype.m_chartType = null;
oFF.ScAtlasStoryView.prototype.m_application = null;
oFF.ScAtlasStoryView.prototype.m_viewPage = null;
oFF.ScAtlasStoryView.prototype.releaseObject = function()
{
	oFF.XObject.prototype.releaseObject.call( this );
	this.m_genesis = null;
	this.m_application = null;
	this.m_story = null;
	this.m_layoutType = null;
	this.m_chartType = null;
	this.m_viewPage = oFF.XObjectExt.release(this.m_viewPage);
};
oFF.ScAtlasStoryView.prototype.setupInternal = function(genesis, application, story, layoutType, chartType)
{
	this.m_genesis = genesis;
	this.m_application = application;
	this.m_story = story;
	this.m_layoutType = oFF.notNull(layoutType) ? layoutType : oFF.OcLayoutType.CANVAS;
	this.m_chartType = oFF.notNull(chartType) ? chartType : oFF.OcChartType.HIGHCHARTS;
	this.createView(genesis);
};
oFF.ScAtlasStoryView.prototype.getPage = function()
{
	return this.m_viewPage;
};
oFF.ScAtlasStoryView.prototype.createView = function(genesis)
{
	this.m_viewPage = genesis.newControl(oFF.UiType.PAGE);
	this.m_viewPage.setName("scAtlasStoryViewPage");
	this.m_viewPage.setShowHeader(true);
	this.m_viewPage.setText(this.m_story.getName());
	this.m_viewPage.useMaxSpace();
	this.renderStory();
};
oFF.ScAtlasStoryView.prototype.renderStory = function()
{
	var quasarStory = oFF.OcQuasarStory.create(this.m_story);
	quasarStory.setQuasarMainLayoutType(this.m_layoutType);
	quasarStory.setQuasarChartType(this.m_chartType);
	var pageList = quasarStory.getQuasarPages();
	var messages = quasarStory.getMessages();
	if (messages.hasErrors())
	{
		var error = messages.getFirstError();
		this.m_genesis.showErrorToast(error.getText());
	}
	else if (messages.getMessages().hasElements())
	{
		var firstWarning = messages.getFirstWithSeverity(oFF.Severity.WARNING);
		if (oFF.notNull(firstWarning))
		{
			this.m_genesis.showWarningToast(firstWarning.getText());
		}
	}
	var pageCount = pageList.size();
	if (pageCount > 0)
	{
		var tabBar = this.m_viewPage.setNewContent(oFF.UiType.TAB_STRIP);
		tabBar.useMaxSpace();
		tabBar.setName(quasarStory.getName());
		tabBar.setCustomObject(quasarStory);
		tabBar.registerOnSelect(this);
		for (var pageIndex = 0; pageIndex < pageCount; pageIndex++)
		{
			var newPage = pageList.get(pageIndex);
			var tabBarItem = tabBar.addNew(oFF.UiType.TAB_STRIP_ITEM);
			tabBarItem.setName(newPage.getId());
			tabBarItem.setText(newPage.getName());
			tabBarItem.setIcon("document");
			tabBarItem.setNewContent(oFF.UiType.ACTIVITY_INDICATOR).setText("Loading page...").useMaxSpace();
			var storyDef = newPage.getPageContent();
			if (oFF.isNull(storyDef))
			{
				var textItem = this.m_viewPage.setNewContent(oFF.UiType.TEXT).setText("This page has no widgets!");
				textItem.setBackgroundColor(oFF.UiColor.createByString("#cc0033"));
				textItem.setFontColor(oFF.UiColor.createByString("#ffffff"));
				textItem.setFontSizeValue(15);
			}
			else
			{
				var tmpQsaEngine = oFF.QuasarEngine.create(this.m_application);
				var tmpQuasarGeneis = oFF.UiGenesis.create(tabBarItem, oFF.UiPosition.CONTENT, oFF.UiOperation.SET, 0, 0);
				tmpQsaEngine.setDocument(storyDef);
				tmpQsaEngine.renderUi(tmpQuasarGeneis);
			}
		}
	}
	else
	{
		var textItem2 = this.m_viewPage.setNewContent(oFF.UiType.TEXT).setText("This story has no content!");
		textItem2.setBackgroundColor(oFF.UiColor.createByString("#cc0033"));
		textItem2.setFontColor(oFF.UiColor.createByString("#ffffff"));
		textItem2.setFontSizeValue(15);
	}
};
oFF.ScAtlasStoryView.prototype.onSelect = function(event) {};
oFF.ScAtlasStoryView.prototype.onLiveChange = function(event) {};
oFF.ScAtlasStoryView.prototype.onSearch = function(event) {};
oFF.ScAtlasStoryView.prototype.onPress = function(event)
{
	this.m_genesis.showInfoToast("Works!");
};

oFF.OpenQueryDialogI18n = function() {};
oFF.OpenQueryDialogI18n.prototype = new oFF.OlapUiI18n();
oFF.OpenQueryDialogI18n.prototype._ff_c = "OpenQueryDialogI18n";

oFF.OpenQueryDialogI18n.I18N_OD_TITLE = "I18N_OD_TITLE";
oFF.OpenQueryDialogI18n.I18N_OD_KEY = "I18N_OD_KEY";
oFF.OpenQueryDialogI18n.I18N_OD_DESCRIPTION = "I18N_OD_DESCRIPTION";
oFF.OpenQueryDialogI18n.I18N_OD_SEARCH_KEY_PLACEHOLDER = "I18N_OD_SEARCH_KEY_PLACEHOLDER";
oFF.OpenQueryDialogI18n.I18N_OD_SEARCH_DESCR_PLACEHOLDER = "I18N_OD_SEARCH_DESCR_PLACEHOLDER";
oFF.OpenQueryDialogI18n.I18N_OD_SEARCH = "I18N_OD_SEARCH";
oFF.OpenQueryDialogI18n.I18N_OD_SYSTEM = "I18N_OD_SYSTEM";
oFF.OpenQueryDialogI18n.I18N_OD_QUERIES = "I18N_OD_QUERIES";
oFF.OpenQueryDialogI18n.createOpenQueryDialogI18n = function()
{
	return new oFF.OpenQueryDialogI18n();
};
oFF.OpenQueryDialogI18n.staticSetupOqd = function()
{
	oFF.OlapUiI18n.addDefaultValue(oFF.OpenQueryDialogI18n.I18N_OD_TITLE, "Open Query");
	oFF.OlapUiI18n.addDefaultValue(oFF.OpenQueryDialogI18n.I18N_OD_DESCRIPTION, "Description");
	oFF.OlapUiI18n.addDefaultValue(oFF.OpenQueryDialogI18n.I18N_OD_KEY, "Technical Name");
	oFF.OlapUiI18n.addDefaultValue(oFF.OpenQueryDialogI18n.I18N_OD_SEARCH_KEY_PLACEHOLDER, "Search by Technical Name");
	oFF.OlapUiI18n.addDefaultValue(oFF.OpenQueryDialogI18n.I18N_OD_SEARCH_DESCR_PLACEHOLDER, "Search by Description");
	oFF.OlapUiI18n.addDefaultValue(oFF.OpenQueryDialogI18n.I18N_OD_SEARCH, "Search");
	oFF.OlapUiI18n.addDefaultValue(oFF.OpenQueryDialogI18n.I18N_OD_SYSTEM, "System");
	oFF.OlapUiI18n.addDefaultValue(oFF.OpenQueryDialogI18n.I18N_OD_QUERIES, "Queries");
};

oFF.AuGdsFilterPanel = function() {};
oFF.AuGdsFilterPanel.prototype = new oFF.XObjectExt();
oFF.AuGdsFilterPanel.prototype._ff_c = "AuGdsFilterPanel";

oFF.AuGdsFilterPanel.createFilterPanel = function(genesis)
{
	var obj = new oFF.AuGdsFilterPanel();
	obj.setupExt(genesis);
	return obj;
};
oFF.AuGdsFilterPanel.prototype.m_genesis = null;
oFF.AuGdsFilterPanel.prototype.m_filterList = null;
oFF.AuGdsFilterPanel.prototype.m_queryManager = null;
oFF.AuGdsFilterPanel.prototype.m_editActionListeners = null;
oFF.AuGdsFilterPanel.prototype.setupExt = function(genesis)
{
	this.m_genesis = genesis;
	this.m_editActionListeners = oFF.XList.create();
	this.m_filterList = this.m_genesis.newControl(oFF.UiType.LIST);
	this.m_filterList.useMaxSpace();
	this.m_filterList.setSelectionMode(oFF.UiSelectionMode.NONE);
	this.m_filterList.setNewHeader(oFF.UiType.LABEL).setText("Filter Panel").setFontWeight(oFF.UiFontWeight.BOLD);
};
oFF.AuGdsFilterPanel.prototype.releaseObject = function()
{
	this.m_editActionListeners.clear();
	this.m_editActionListeners = oFF.XObjectExt.release(this.m_editActionListeners);
	this.m_queryManager = null;
	this.m_genesis = null;
	oFF.XObjectExt.release(this.m_filterList);
	oFF.XObjectExt.prototype.releaseObject.call( this );
};
oFF.AuGdsFilterPanel.prototype.addEditActionListener = function(editActionListener)
{
	this.m_editActionListeners.add(editActionListener);
};
oFF.AuGdsFilterPanel.prototype.removeEditActionListener = function(editActionListener)
{
	this.m_editActionListeners.removeElement(editActionListener);
};
oFF.AuGdsFilterPanel.prototype.getQueryManager = function()
{
	return this.m_queryManager;
};
oFF.AuGdsFilterPanel.prototype.getView = function()
{
	return this.m_filterList;
};
oFF.AuGdsFilterPanel.prototype.getGenesis = function()
{
	return this.m_genesis;
};
oFF.AuGdsFilterPanel.prototype.setQueryManager = function(manager)
{
	if (oFF.notNull(this.m_queryManager))
	{
		this.m_queryManager.getQueryModel().getFilter().unregisterChangedListener(this);
	}
	this.m_queryManager = manager;
	this.m_queryManager.getQueryModel().getFilter().registerChangedListener(this, null);
	this.m_filterList.clearItems();
	if (!this.m_queryManager.isSubmitNeeded())
	{
		this.updateFilterPanel();
	}
};
oFF.AuGdsFilterPanel.prototype.updateFilterPanel = function()
{
	this.m_filterList.clearItems();
	if (oFF.isNull(this.m_queryManager))
	{
		return;
	}
	var filter = this.m_queryManager.getQueryModel().getFilter();
	var dynamicFilter = filter.getDynamicFilter();
	if (dynamicFilter.isCartesianProduct() && dynamicFilter.getCartesianProduct() !== null)
	{
		var cartesianProduct = dynamicFilter.getCartesianProduct();
		for (var i = 0; i < cartesianProduct.size(); i++)
		{
			var cartesianChild = cartesianProduct.getCartesianChild(i);
			var dimensionEntry = this.createDimensionEntry(cartesianProduct, cartesianChild);
			this.m_filterList.addItem(dimensionEntry);
			for (var j = 0; j < cartesianChild.size(); j++)
			{
				var cartesianElement = cartesianChild.getOp(j);
				var filterEntry = this.createFilterEntry(cartesianChild, cartesianElement);
				if (oFF.isNull(filterEntry))
				{
					continue;
				}
				this.m_filterList.addItem(filterEntry);
			}
		}
	}
};
oFF.AuGdsFilterPanel.prototype.createDimensionEntry = function(parent, cartesianList)
{
	var dimension = cartesianList.getDimension();
	var dimensionItem = this.m_genesis.newControl(oFF.UiType.CUSTOM_LIST_ITEM);
	var content = dimensionItem.setNewContent(oFF.UiType.FLEX_LAYOUT);
	content.setJustifyContent(oFF.UiFlexJustifyContent.SPACE_BETWEEN);
	content.setAlignContent(oFF.UiFlexAlignContent.CENTER);
	content.useMaxWidth();
	content.setHeightCss("48px");
	content.setPaddingCss("5px");
	content.setBackgroundColor(oFF.UiColor.GREY.newBrighterColor(0.3));
	var title = content.addNewItemOfType(oFF.UiType.LABEL);
	title.setText(dimension.getText());
	title.setFontWeight(oFF.UiFontWeight.BOLD);
	title.setMargin(oFF.UiUnitValue.createByCss("5px"));
	var deleteIco = content.addNewItemOfType(oFF.UiType.ICON);
	deleteIco.setIcon("sys-cancel");
	deleteIco.setTooltip("Remove all dimension filters");
	deleteIco.setFontColor(oFF.UiColor.RED.newDarkerColor(0.2));
	deleteIco.setSizeCss("16px", "16px");
	deleteIco.registerOnPress(oFF.PressListenerLambda.create( function(){
		parent.removeElement(cartesianList);
		this.notifyEditActionListeners();
	}.bind(this)));
	return dimensionItem;
};
oFF.AuGdsFilterPanel.prototype.createFilterEntry = function(parent, element)
{
	var dimension = parent.getDimension();
	var filterEntry = this.m_genesis.newControl(oFF.UiType.CUSTOM_LIST_ITEM);
	var content = filterEntry.setNewContent(oFF.UiType.FLEX_LAYOUT);
	content.setJustifyContent(oFF.UiFlexJustifyContent.SPACE_BETWEEN);
	content.setAlignContent(oFF.UiFlexAlignContent.CENTER);
	content.setHeightCss("32px");
	content.setPaddingCss("5px");
	var startSpacer = content.addNewItemOfType(oFF.UiType.SPACER);
	startSpacer.setFlex("0 0 20px");
	var comparisonOperator = element.getComparisonOperator();
	if (oFF.isNull(comparisonOperator))
	{
		return null;
	}
	var setSign = element.getSetSign();
	if (setSign === oFF.SetSign.EXCLUDING)
	{
		if (comparisonOperator === oFF.ComparisonOperator.EQUAL)
		{
			comparisonOperator = oFF.ComparisonOperator.NOT_EQUAL;
		}
		if (comparisonOperator === oFF.ComparisonOperator.BETWEEN)
		{
			comparisonOperator = oFF.ComparisonOperator.NOT_BETWEEN;
		}
	}
	var operatorLbl = content.addNewItemOfType(oFF.UiType.LABEL);
	operatorLbl.setText(comparisonOperator.getName());
	operatorLbl.setFlex("1 0 40%");
	var lowLbl = content.addNewItemOfType(oFF.UiType.LABEL);
	lowLbl.setFlex("1 1 30%");
	var low = element.getLow();
	var lowText = this.getDisplayText(dimension, low);
	if (oFF.notNull(lowText))
	{
		lowLbl.setText(lowText);
	}
	var highLbl = content.addNewItemOfType(oFF.UiType.LABEL);
	highLbl.setFlex("1 1 30%");
	var high = element.getHigh();
	var highText = this.getDisplayText(dimension, high);
	if (oFF.notNull(highText))
	{
		lowLbl.setText(highText);
	}
	var deleteIco = content.addNewItemOfType(oFF.UiType.ICON);
	deleteIco.setIcon("sys-cancel");
	deleteIco.setTooltip("Remove filter");
	deleteIco.setFontColor(oFF.UiColor.ORANGE.newDarkerColor(0.2));
	deleteIco.setHeightCss("16px");
	deleteIco.setFlex("0 0 16px");
	deleteIco.registerOnPress(oFF.PressListenerLambda.create( function(){
		parent.removeElement(element);
		this.notifyEditActionListeners();
	}.bind(this)));
	return filterEntry;
};
oFF.AuGdsFilterPanel.prototype.notifyEditActionListeners = function()
{
	for (var i = 0; i < this.m_editActionListeners.size(); i++)
	{
		this.m_editActionListeners.get(i).notifyEditAction();
	}
};
oFF.AuGdsFilterPanel.prototype.getDisplayText = function(dimension, bag)
{
	var text = bag.getSupplementValueString(dimension.getTextField().getName());
	if (oFF.XStringUtils.isNotNullAndNotEmpty(text))
	{
		return text;
	}
	var value = bag.getValue();
	if (oFF.notNull(value))
	{
		return value.getStringRepresentation();
	}
	return null;
};
oFF.AuGdsFilterPanel.prototype.onModelComponentChanged = function(modelComponent, customIdentifier)
{
	this.updateFilterPanel();
};
oFF.AuGdsFilterPanel.prototype.clearEditActionListeners = function()
{
	this.m_editActionListeners.clear();
};

oFF.AuGdsInteractiveTableView = function() {};
oFF.AuGdsInteractiveTableView.prototype = new oFF.XObject();
oFF.AuGdsInteractiveTableView.prototype._ff_c = "AuGdsInteractiveTableView";

oFF.AuGdsInteractiveTableView.CONTEXT_MENU = "contextMenu";
oFF.AuGdsInteractiveTableView.EXPAND_MENU = "expand";
oFF.AuGdsInteractiveTableView.DRILL_MENU = "drill";
oFF.AuGdsInteractiveTableView.COLLAPSE_MENU = "collapse";
oFF.AuGdsInteractiveTableView.DIMENSION_CONTEXT_MENU = "dimensionContextMenu";
oFF.AuGdsInteractiveTableView.FILTER_CONTEXT_MENU = "filterContextMenu";
oFF.AuGdsInteractiveTableView.FILTER_SELECTION_CONTEXT_MENU = "filterSelectionContextMenu";
oFF.AuGdsInteractiveTableView.FILTER_CLEAR_MENU = "filterClearMenu";
oFF.AuGdsInteractiveTableView.MOVE_TO_COL_MENU = "moveToColMenu";
oFF.AuGdsInteractiveTableView.MOVE_TO_ROW_MENU = "moveToRowMenu";
oFF.AuGdsInteractiveTableView.MOVE_TO_FREE_MENU = "moveToFreeMenu";
oFF.AuGdsInteractiveTableView.UDH_ROW_TOGGLE = "udhRowToggle";
oFF.AuGdsInteractiveTableView.SORT_ASC_MENU = "sortAscMenu";
oFF.AuGdsInteractiveTableView.SORT_DESC_MENU = "sortDescMenu";
oFF.AuGdsInteractiveTableView.SORT_DEFAULT_MENU = "sortDefaultMenu";
oFF.AuGdsInteractiveTableView.SHOW_MASTERDATA_MENU = "showMasterdataMenu";
oFF.AuGdsInteractiveTableView.HIDE_MASTERDATA_MENU = "hideMasterdataMenu";
oFF.AuGdsInteractiveTableView.LEVEL_UP_MENU = "levelUpMenu";
oFF.AuGdsInteractiveTableView.LEVEL_DOWN_MENU = "levelDownMenu";
oFF.AuGdsInteractiveTableView.MEMBER_TO_LEFT_MENU = "memberLeftMenu";
oFF.AuGdsInteractiveTableView.MEMBER_TO_RIGHT_MENU = "memberRightMenu";
oFF.AuGdsInteractiveTableView.MEMBER_UP_MENU = "memberUpMenu";
oFF.AuGdsInteractiveTableView.MEMBER_DOWN_MENU = "memberDownMenu";
oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN = "attributeDropdown";
oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN_KEY = "attributeDropdownKey";
oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN_TEXT = "attributeDropdownText";
oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN_TEXT_KEY = "attributeDropdownTextKey";
oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN_KEY_TEXT = "attributeDropdownKeyText";
oFF.AuGdsInteractiveTableView.ACTIVATE_HIERARCHY_MENU = "activateHierarchyMenu";
oFF.AuGdsInteractiveTableView.FLAT_PRESENTATION_MENU = "flatPresentationMenu";
oFF.AuGdsInteractiveTableView.EXPAND_BOTTOM_UP_MENU = "expandBottomUpMenu";
oFF.AuGdsInteractiveTableView.EXPAND_TOP_DOWN_MENU = "expandTopDownMenu";
oFF.AuGdsInteractiveTableView.ACTIVATE_NODE_CONDENSATION_MENU = "activateNodeCondensationMenu";
oFF.AuGdsInteractiveTableView.DEACTIVATE_NODE_CONDENSATION_MENU = "deActivateNodeCondensationMenu";
oFF.AuGdsInteractiveTableView.HIDE_POSTED_NODES_MENU = "hidePostedNodesMenu";
oFF.AuGdsInteractiveTableView.SHOW_POSTED_NODES_MENU = "showPostedNodesMenu";
oFF.AuGdsInteractiveTableView.ACTIVATE_UDH_MENU = "activateUdhMenu";
oFF.AuGdsInteractiveTableView.DE_ACTIVATE_UDH_MENU = "deActivateUdhMenu";
oFF.AuGdsInteractiveTableView.TOTALS_ABOVE_MENU = "totalsAboveMenu";
oFF.AuGdsInteractiveTableView.TOTALS_ABOVE_AND_BELOW_MENU = "totalsAboveAndBelowMenu";
oFF.AuGdsInteractiveTableView.TOTALS_BELOW_MENU = "totalsBelowMenu";
oFF.AuGdsInteractiveTableView.HIDE_TOTALS_MENU = "hideTotalsMenu";
oFF.AuGdsInteractiveTableView.SUPRESS_ZEROS_MENU = "supressZerosMenu";
oFF.AuGdsInteractiveTableView.SHOW_ZEROS_MENU = "showZerosMenu";
oFF.AuGdsInteractiveTableView.DATACELL_MENU = "datacellMenu";
oFF.AuGdsInteractiveTableView.LAYOUT_BTN = "layoutBtn";
oFF.AuGdsInteractiveTableView.MASTER_CONTEXT_MENU = "masterContextMenu";
oFF.AuGdsInteractiveTableView.MOVE_CONTEXT_MENU = "moveContextMenu";
oFF.AuGdsInteractiveTableView.HIERARCHY_CONTEXT_MENU = "hierarchyContextMenu";
oFF.AuGdsInteractiveTableView.TOTALS_CONTEXT_MENU = "totalsContextMenu";
oFF.AuGdsInteractiveTableView.SORT_CONTEXT_MENU = "sortContextMenu";
oFF.AuGdsInteractiveTableView.FILTER_GROUP_CONTEXT_MENU = "filterGroupContextMenu";
oFF.AuGdsInteractiveTableView.UNDO_REDO_ACTION_ID = "undoRedoActionTrigger";
oFF.AuGdsInteractiveTableView.create = function(application, queryManager, queryExecutedListener, genesis)
{
	var instance = new oFF.AuGdsInteractiveTableView();
	instance.setupInternal(application, queryManager, queryExecutedListener, genesis);
	return instance;
};
oFF.AuGdsInteractiveTableView.supportsTupleElementExpand = function(tupleElement)
{
	var drillState = tupleElement.getDrillState();
	var isUniversalDisplayHierarchy = tupleElement.getDimension().isUniversalDisplayHierarchyDimension();
	return drillState === oFF.DrillState.COLLAPSED && !isUniversalDisplayHierarchy || drillState === oFF.DrillState.COLLAPSED_EXPAND_AND_DRILLDOWN_ALLOWED || drillState === oFF.DrillState.LEAF_UDH_EXPAND_ALLOWED;
};
oFF.AuGdsInteractiveTableView.supportsTupleElementDrill = function(tupleElement)
{
	var drillState = tupleElement.getDrillState();
	var isUniversalDisplayHierarchy = tupleElement.getDimension().isUniversalDisplayHierarchyDimension();
	return drillState === oFF.DrillState.COLLAPSED_EXPAND_AND_DRILLDOWN_ALLOWED || drillState === oFF.DrillState.COLLAPSED && isUniversalDisplayHierarchy || drillState === oFF.DrillState.LEAF_DRILLDOWN_ALLOWED;
};
oFF.AuGdsInteractiveTableView.supportsTupleElementCollapse = function(tupleElement)
{
	var drillState = tupleElement.getDrillState();
	return drillState === oFF.DrillState.EXPANDED || drillState === oFF.DrillState.DRILLED || drillState === oFF.DrillState.DRILL_DOWN;
};
oFF.AuGdsInteractiveTableView.prototype.m_application = null;
oFF.AuGdsInteractiveTableView.prototype.m_queryManager = null;
oFF.AuGdsInteractiveTableView.prototype.m_genesis = null;
oFF.AuGdsInteractiveTableView.prototype.m_sacTable = null;
oFF.AuGdsInteractiveTableView.prototype.m_contextMenu = null;
oFF.AuGdsInteractiveTableView.prototype.m_dcController = null;
oFF.AuGdsInteractiveTableView.prototype.m_rowMin = 0;
oFF.AuGdsInteractiveTableView.prototype.m_rowMax = 0;
oFF.AuGdsInteractiveTableView.prototype.m_columnMin = 0;
oFF.AuGdsInteractiveTableView.prototype.m_columnMax = 0;
oFF.AuGdsInteractiveTableView.prototype.m_masterItems = null;
oFF.AuGdsInteractiveTableView.prototype.m_sortItems = null;
oFF.AuGdsInteractiveTableView.prototype.m_moveItems = null;
oFF.AuGdsInteractiveTableView.prototype.m_totalsItems = null;
oFF.AuGdsInteractiveTableView.prototype.m_filterItems = null;
oFF.AuGdsInteractiveTableView.prototype.m_hierarchyItems = null;
oFF.AuGdsInteractiveTableView.prototype.m_directItems = null;
oFF.AuGdsInteractiveTableView.prototype.m_queryExecutedListener = null;
oFF.AuGdsInteractiveTableView.prototype.m_toolbarItems = null;
oFF.AuGdsInteractiveTableView.prototype.setupInternal = function(application, queryManager, queryExecutedListener, genesis)
{
	this.m_genesis = genesis;
	this.m_application = application;
	this.m_queryManager = queryManager;
	this.m_queryExecutedListener = queryExecutedListener;
	this.m_sacTable = this.m_genesis.newControl(oFF.UiType.SAC_TABLE_GRID);
	this.m_sacTable.useMaxSpace();
	this.m_sacTable.registerOnContextMenu(this);
	this.m_sacTable.registerOnButtonPress(this);
	this.m_sacTable.registerOnClick(this);
	this.m_contextMenu = this.m_genesis.newControl(oFF.UiType.MENU);
	this.m_contextMenu.setName(oFF.AuGdsInteractiveTableView.CONTEXT_MENU);
	this.m_masterItems = oFF.XList.create();
	this.m_sortItems = oFF.XList.create();
	this.m_moveItems = oFF.XList.create();
	this.m_totalsItems = oFF.XList.create();
	this.m_filterItems = oFF.XList.create();
	this.m_hierarchyItems = oFF.XList.create();
	this.m_directItems = oFF.XList.create();
	this.m_toolbarItems = oFF.XList.create();
	this.m_rowMax = -1;
	this.m_columnMax = -1;
};
oFF.AuGdsInteractiveTableView.prototype.registerOnSelectionChange = function(listener)
{
	this.m_sacTable.registerOnSelectionChange(listener);
};
oFF.AuGdsInteractiveTableView.prototype.releaseObject = function()
{
	this.m_application = null;
	this.m_queryManager = null;
	this.m_genesis = null;
	this.m_queryExecutedListener = null;
	this.m_sacTable = oFF.XObjectExt.release(this.m_sacTable);
	oFF.XObject.prototype.releaseObject.call( this );
};
oFF.AuGdsInteractiveTableView.prototype.setQueryManager = function(queryManager)
{
	this.m_queryManager = queryManager;
};
oFF.AuGdsInteractiveTableView.prototype.getQueryManager = function()
{
	return this.m_queryManager;
};
oFF.AuGdsInteractiveTableView.prototype.getView = function()
{
	return this.m_sacTable;
};
oFF.AuGdsInteractiveTableView.prototype.getGenesis = function()
{
	return this.m_genesis;
};
oFF.AuGdsInteractiveTableView.prototype.clearTable = function()
{
	this.m_sacTable.setModelJson(null);
};
oFF.AuGdsInteractiveTableView.prototype.updateTable = function()
{
	if (oFF.isNull(this.m_sacTable))
	{
		return;
	}
	if (oFF.isNull(this.m_queryManager))
	{
		return;
	}
	this.m_sacTable.setBusy(true);
	this.m_queryManager.processQueryExecution(oFF.SyncType.NON_BLOCKING, this, null);
};
oFF.AuGdsInteractiveTableView.prototype.executeUndo = function()
{
	this.m_sacTable.setBusy(true);
	this.m_application.getUndoManager().processUndo(oFF.SyncType.NON_BLOCKING, this, null);
};
oFF.AuGdsInteractiveTableView.prototype.executeRedo = function()
{
	this.m_sacTable.setBusy(true);
	this.m_application.getUndoManager().processRedo(oFF.SyncType.NON_BLOCKING, this, null);
};
oFF.AuGdsInteractiveTableView.prototype.rerenderTable = function()
{
	var resultSet = this.m_queryManager.getActiveResultSetContainer().getCursorResultSet();
	var modelJson = oFF.GridRendererFactory.createRenderer(oFF.ProtocolBindingType.SAC_TABLE_GRID).render(resultSet);
	var resolver = oFF.GridResolverFactory.createResolver(oFF.ProtocolBindingType.SAC_TABLE_GRID);
	resolver.updateModel(this.m_queryManager.getActiveResultSetContainer().getClassicResultSet(), modelJson.asStructure());
	this.m_sacTable.setCustomObject(resolver);
	this.m_sacTable.setModelJson(modelJson);
	this.m_sacTable.setBusy(false);
};
oFF.AuGdsInteractiveTableView.prototype.clearMenuItems = function()
{
	this.m_contextMenu.clearItems();
	this.m_masterItems.clear();
	this.m_sortItems.clear();
	this.m_moveItems.clear();
	this.m_totalsItems.clear();
	this.m_filterItems.clear();
	this.m_hierarchyItems.clear();
	this.m_directItems.clear();
};
oFF.AuGdsInteractiveTableView.prototype.onContextMenu = function(event)
{
	this.clearMenuItems();
	var resolver = event.getControl().getCustomObject();
	if (!this.prepareMultiSelectMenu(resolver))
	{
		var column = event.getParameters().getIntegerByKey(oFF.UiControlEvent.PARAM_COLUMN);
		var row = event.getParameters().getIntegerByKey(oFF.UiControlEvent.PARAM_ROW);
		this.prepareSingleSelectMenu(column, row, resolver);
	}
	if (this.buildContextMenuItems())
	{
		var clickX = event.getParameters().getIntegerByKeyExt(oFF.UiControlEvent.PARAM_CLICK_X, 0);
		var clickY = event.getParameters().getIntegerByKeyExt(oFF.UiControlEvent.PARAM_CLICK_Y, 0);
		this.m_contextMenu.openAtPosition(clickX, clickY);
	}
};
oFF.AuGdsInteractiveTableView.prototype.prepareSingleSelectMenu = function(column, row, resolver)
{
	var caps = this.getQueryManager().getModelCapabilities();
	var menuItem = this.addMenuItemFor(this.m_masterItems);
	menuItem.setText("Layout ...");
	menuItem.setIcon("chart-axis");
	menuItem.setName(oFF.AuGdsInteractiveTableView.LAYOUT_BTN);
	menuItem.registerOnPress(this);
	this.createTupleElementMenu(resolver.getColumnTupleElements(column, column, row));
	this.createTupleElementMenu(resolver.getRowTupleElements(column, row, row));
	var onHeaderColumn = resolver.isOnHeaderColumn(column);
	var onHeaderRow = resolver.isOnHeaderRow(row);
	if (onHeaderRow)
	{
		this.createDimensionMenu(resolver.getColumnDimensions(row, row), resolver.getColumnTupleFieldName(row));
	}
	if (onHeaderColumn && !onHeaderRow)
	{
		this.createDimensionMenu(resolver.getRowDimensions(column, column), resolver.getRowTupleFieldName(column));
	}
	var structureMembers = oFF.XList.create();
	var structureDimension;
	var asmSize;
	var smIndex;
	var structureMember = this.addStructureMemberFromTuple(structureMembers, resolver.getRowTuple(row));
	var allStructureMembers;
	if (oFF.notNull(structureMember) && caps.supportsDimensionSorting(structureMember.getDimension(), oFF.SortType.MEMBER_KEY))
	{
		structureDimension = structureMember.getDimension();
		allStructureMembers = structureDimension.getStructureLayout();
		asmSize = allStructureMembers.size();
		if (asmSize > 1)
		{
			smIndex = allStructureMembers.getIndex(structureMember);
			if (smIndex > 0)
			{
				menuItem = this.addMenuItemFor(this.m_moveItems);
				menuItem.setText("Move up");
				menuItem.setIcon("arrow-top");
				menuItem.setName(oFF.AuGdsInteractiveTableView.MEMBER_UP_MENU);
				menuItem.setCustomObject(structureMember);
				menuItem.registerOnPress(this);
			}
			if (smIndex < asmSize - 1)
			{
				menuItem = this.addMenuItemFor(this.m_moveItems);
				menuItem.setText("Move down");
				menuItem.setIcon("arrow-bottom");
				menuItem.setName(oFF.AuGdsInteractiveTableView.MEMBER_DOWN_MENU);
				menuItem.setCustomObject(structureMember);
				menuItem.registerOnPress(this);
			}
		}
	}
	structureMember = this.addStructureMemberFromTuple(structureMembers, resolver.getColumnTuple(column));
	if (oFF.notNull(structureMember) && caps.supportsDimensionSorting(structureMember.getDimension(), oFF.SortType.MEMBER_KEY))
	{
		structureDimension = structureMember.getDimension();
		allStructureMembers = structureDimension.getStructureLayout();
		asmSize = allStructureMembers.size();
		if (asmSize > 1)
		{
			smIndex = allStructureMembers.getIndex(structureMember);
			if (smIndex > 0)
			{
				menuItem = this.addMenuItemFor(this.m_moveItems);
				menuItem.setText("Move left");
				menuItem.setIcon("arrow-left");
				menuItem.setName(oFF.AuGdsInteractiveTableView.MEMBER_TO_LEFT_MENU);
				menuItem.setCustomObject(structureMember);
				menuItem.registerOnPress(this);
			}
			if (smIndex < asmSize - 1)
			{
				menuItem = this.addMenuItemFor(this.m_moveItems);
				menuItem.setText("Move right");
				menuItem.setIcon("arrow-right");
				menuItem.setName(oFF.AuGdsInteractiveTableView.MEMBER_TO_RIGHT_MENU);
				menuItem.setCustomObject(structureMember);
				menuItem.registerOnPress(this);
			}
		}
	}
	for (var i = 0; i < structureMembers.size(); i++)
	{
		structureMember = structureMembers.get(i);
		menuItem = this.addMenuItemFor(this.m_directItems);
		menuItem.setText(structureMember.getText());
		menuItem.setIcon("action-settings");
		menuItem.setName(oFF.AuGdsInteractiveTableView.DATACELL_MENU);
		menuItem.registerOnPress(this);
		if (structureMember.getDimension().isMeasureStructure())
		{
			var structureMemberList = oFF.XList.create();
			structureMemberList.add(structureMember);
			menuItem.setCustomObject(structureMemberList);
		}
		else
		{
			menuItem.setCustomObject(structureMembers);
		}
	}
};
oFF.AuGdsInteractiveTableView.prototype.createDimensionMenu = function(dimensions, fieldName)
{
	var menuItem;
	var caps = this.getQueryManager().getModelCapabilities();
	var dimensionsRemapped = null;
	if (oFF.notNull(dimensions))
	{
		dimensionsRemapped = oFF.XStream.of(dimensions).map( function(orig){
			return this.getQueryManager().getQueryModel().getDimensionByName(orig.getName());
		}.bind(this)).collect(oFF.XStreamCollector.toList());
	}
	if (dimensionsRemapped.hasElements())
	{
		var axis = dimensionsRemapped.get(0).getAxis();
		var isUniversalDisplayHierarchyDimension = dimensionsRemapped.get(0).isUniversalDisplayHierarchyDimension();
		if (caps.supportsUniversalDisplayHierarchies())
		{
			if (isUniversalDisplayHierarchyDimension)
			{
				menuItem = this.addMenuItemFor(this.m_hierarchyItems);
				menuItem.setText("Deactivate UDH");
				menuItem.setName(oFF.AuGdsInteractiveTableView.DE_ACTIVATE_UDH_MENU);
				menuItem.setCustomObject(axis);
				menuItem.registerOnPress(this);
			}
			else if (axis.getDimensions().size() > 1)
			{
				menuItem = this.addMenuItemFor(this.m_hierarchyItems);
				menuItem.setText("Activate  UDH");
				menuItem.setName(oFF.AuGdsInteractiveTableView.ACTIVATE_UDH_MENU);
				menuItem.setCustomObject(axis);
				menuItem.registerOnPress(this);
			}
		}
		if (axis.getResultStructureController().supportsResultAlignment())
		{
			var resultAlignments = caps.getSupportedResultAlignments();
			if (oFF.XCollectionUtils.hasElements(resultAlignments) && resultAlignments.size() > 1)
			{
				if (resultAlignments.contains(oFF.ResultAlignment.BOTTOM))
				{
					menuItem = this.addMenuItemFor(this.m_totalsItems);
					if (axis.getType() === oFF.AxisType.ROWS)
					{
						menuItem.setText("Bottom");
					}
					else
					{
						menuItem.setText("Right");
					}
					menuItem.setName(oFF.AuGdsInteractiveTableView.TOTALS_BELOW_MENU);
					menuItem.setCustomObject(axis);
					menuItem.registerOnPress(this);
				}
				if (resultAlignments.contains(oFF.ResultAlignment.TOP))
				{
					menuItem = this.addMenuItemFor(this.m_totalsItems);
					if (axis.getType() === oFF.AxisType.ROWS)
					{
						menuItem.setText("Top");
					}
					else
					{
						menuItem.setText("Left");
					}
					menuItem.setName(oFF.AuGdsInteractiveTableView.TOTALS_ABOVE_MENU);
					menuItem.setCustomObject(axis);
					menuItem.registerOnPress(this);
				}
				if (resultAlignments.contains(oFF.ResultAlignment.TOPBOTTOM))
				{
					menuItem = this.addMenuItemFor(this.m_totalsItems);
					if (axis.getType() === oFF.AxisType.ROWS)
					{
						menuItem.setText("Top & Bottom");
					}
					else
					{
						menuItem.setText("Left & Right");
					}
					menuItem.setName(oFF.AuGdsInteractiveTableView.TOTALS_ABOVE_AND_BELOW_MENU);
					menuItem.setCustomObject(axis);
					menuItem.registerOnPress(this);
				}
			}
			menuItem = this.addMenuItemFor(this.m_totalsItems);
			menuItem.setText("Hide Totals");
			menuItem.setIcon("hide");
			menuItem.setName(oFF.AuGdsInteractiveTableView.HIDE_TOTALS_MENU);
			menuItem.setCustomObject(axis);
			menuItem.registerOnPress(this);
		}
		if (caps.supportsZeroSuppression() || caps.supportsNullZeroSuppression())
		{
			if (axis.getZeroSuppressionType() !== oFF.ZeroSuppressionType.NONE)
			{
				menuItem = this.addMenuItemFor(this.m_filterItems);
				menuItem.setText("Show Zeros");
				menuItem.setName(oFF.AuGdsInteractiveTableView.SHOW_ZEROS_MENU);
				menuItem.setCustomObject(axis);
				menuItem.registerOnPress(this);
			}
			if (axis.getZeroSuppressionType() !== oFF.ZeroSuppressionType.ALL_CELLS_ARE_ZERO)
			{
				menuItem = this.addMenuItemFor(this.m_filterItems);
				menuItem.setText("Show Zeros");
				menuItem.setName(oFF.AuGdsInteractiveTableView.SUPRESS_ZEROS_MENU);
				menuItem.setCustomObject(axis);
				menuItem.registerOnPress(this);
			}
		}
		if (!isUniversalDisplayHierarchyDimension)
		{
			var axisSize = axis.size();
			if (axisSize > 0)
			{
				var axisIndexMin = axis.getIndex(dimensionsRemapped.get(0));
				var axisIndexMax = axis.getIndex(dimensionsRemapped.get(dimensionsRemapped.size() - 1));
				if (axisIndexMin > 0)
				{
					menuItem = this.addMenuItemFor(this.m_moveItems);
					if (axis.getType() === oFF.AxisType.ROWS)
					{
						menuItem.setText("Move left");
						menuItem.setIcon("arrow-left");
					}
					else
					{
						menuItem.setText("Move up");
						menuItem.setIcon("arrow-top");
					}
					menuItem.setName(oFF.AuGdsInteractiveTableView.LEVEL_UP_MENU);
					menuItem.setCustomObject(dimensionsRemapped);
					menuItem.registerOnPress(this);
				}
				if (axisIndexMax < axisSize - 1)
				{
					menuItem = this.addMenuItemFor(this.m_moveItems);
					if (axis.getType() === oFF.AxisType.ROWS)
					{
						menuItem.setText("Move right");
						menuItem.setIcon("arrow-right");
					}
					else
					{
						menuItem.setText("Move down");
						menuItem.setIcon("arrow-bottom");
					}
					menuItem.setName(oFF.AuGdsInteractiveTableView.LEVEL_DOWN_MENU);
					menuItem.setCustomObject(dimensionsRemapped);
					menuItem.registerOnPress(this);
				}
			}
			var dimensionsToMove;
			dimensionsToMove = axis.getType() === oFF.AxisType.COLUMNS ? null : oFF.XStream.of(dimensionsRemapped).filter( function(rmFF){
				return rmFF.supportsAxis(oFF.AxisType.COLUMNS);
			}.bind(this)).collect(oFF.XStreamCollector.toList());
			if (oFF.XCollectionUtils.hasElements(dimensionsToMove))
			{
				menuItem = this.addMenuItemFor(this.m_moveItems);
				menuItem.setText("Move to Columns");
				menuItem.setIcon("table-column");
				menuItem.setName(oFF.AuGdsInteractiveTableView.MOVE_TO_COL_MENU);
				menuItem.setCustomObject(dimensionsToMove);
				menuItem.registerOnPress(this);
			}
			dimensionsToMove = axis.getType() === oFF.AxisType.ROWS ? null : oFF.XStream.of(dimensionsRemapped).filter( function(rmFF1){
				return rmFF1.supportsAxis(oFF.AxisType.ROWS);
			}.bind(this)).collect(oFF.XStreamCollector.toList());
			if (oFF.XCollectionUtils.hasElements(dimensionsToMove))
			{
				menuItem = this.addMenuItemFor(this.m_moveItems);
				menuItem.setText("Move to Rows");
				menuItem.setIcon("table-row");
				menuItem.setName(oFF.AuGdsInteractiveTableView.MOVE_TO_ROW_MENU);
				menuItem.setCustomObject(dimensionsToMove);
				menuItem.registerOnPress(this);
			}
			dimensionsToMove = oFF.XStream.of(dimensionsRemapped).filter( function(rmFF2){
				return rmFF2.supportsAxis(oFF.AxisType.FREE);
			}.bind(this)).collect(oFF.XStreamCollector.toList());
			if (oFF.XCollectionUtils.hasElements(dimensionsToMove))
			{
				menuItem = this.addMenuItemFor(this.m_moveItems);
				menuItem.setText("Remove from Axis");
				menuItem.setIcon("delete");
				menuItem.setName(oFF.AuGdsInteractiveTableView.MOVE_TO_FREE_MENU);
				menuItem.setCustomObject(dimensionsToMove);
				menuItem.registerOnPress(this);
			}
			if (dimensionsRemapped.size() === 1)
			{
				var dimension = dimensionsRemapped.get(0);
				menuItem = this.addMenuItemFor(this.m_masterItems);
				menuItem.setText("Dimension Settings ...");
				menuItem.setIcon("dimension");
				menuItem.setName(oFF.AuGdsInteractiveTableView.DIMENSION_CONTEXT_MENU);
				menuItem.setCustomObject(dimension);
				menuItem.registerOnPress(this);
				if (this.hasFilterOnDimension(dimension))
				{
					menuItem = this.addMenuItemFor(this.m_filterItems);
					menuItem.setText("Clear filter  ");
					menuItem.setIcon("clear-filter");
					menuItem.setName(oFF.AuGdsInteractiveTableView.FILTER_CLEAR_MENU);
					menuItem.setCustomObject(dimension);
					menuItem.registerOnPress(this);
				}
				menuItem = this.addMenuItemFor(this.m_filterItems);
				menuItem.setText("Add filter");
				menuItem.setIcon("add-filter");
				menuItem.setName(oFF.AuGdsInteractiveTableView.FILTER_CONTEXT_MENU);
				menuItem.setCustomObject(dimension);
				menuItem.registerOnPress(this);
				if (oFF.notNull(fieldName) && dimension.getFieldByName(fieldName) !== null)
				{
					var field = dimension.getFieldByName(fieldName);
					var dimensionSortType = this.resolveDimensionSortType(field);
					if (caps.supportsFieldSorting(field) || oFF.notNull(dimensionSortType) && caps.supportsDimensionSorting(dimension, dimensionSortType))
					{
						menuItem = this.addMenuItemFor(this.m_sortItems);
						menuItem.setSectionStart(true);
						menuItem.setText("Sort Ascending");
						menuItem.setIcon("sort-ascending");
						menuItem.setName(oFF.AuGdsInteractiveTableView.SORT_ASC_MENU);
						menuItem.setCustomObject(field);
						menuItem.registerOnPress(this);
						menuItem = this.addMenuItemFor(this.m_sortItems);
						menuItem.setText("Sort Descending");
						menuItem.setIcon("sort-descending");
						menuItem.setName(oFF.AuGdsInteractiveTableView.SORT_DESC_MENU);
						menuItem.setCustomObject(field);
						menuItem.registerOnPress(this);
						menuItem = this.addMenuItemFor(this.m_sortItems);
						menuItem.setText("Default Order");
						menuItem.setIcon("decline");
						menuItem.setName(oFF.AuGdsInteractiveTableView.SORT_DEFAULT_MENU);
						menuItem.setCustomObject(field);
						menuItem.registerOnPress(this);
					}
				}
				if (!dimension.getDimensionType().isTypeOf(oFF.DimensionType.ABSTRACT_STRUCTURE))
				{
					if (dimension.getReadMode(oFF.QContextType.RESULT_SET).isTypeOf(oFF.QMemberReadMode.BOOKED))
					{
						menuItem = this.addMenuItemFor(this.m_filterItems);
						menuItem.setText("Show Masterdata");
						menuItem.setName(oFF.AuGdsInteractiveTableView.SHOW_MASTERDATA_MENU);
						menuItem.setCustomObject(dimension);
						menuItem.registerOnPress(this);
					}
					else
					{
						menuItem = this.addMenuItemFor(this.m_filterItems);
						menuItem.setText("Restrict on Booked data");
						menuItem.setName(oFF.AuGdsInteractiveTableView.HIDE_MASTERDATA_MENU);
						menuItem.setCustomObject(dimension);
						menuItem.registerOnPress(this);
					}
				}
				if (dimension.isHierarchyActive())
				{
					menuItem = this.addMenuItemFor(this.m_hierarchyItems);
					menuItem.setText("Flat display");
					menuItem.setIcon("list");
					menuItem.setName(oFF.AuGdsInteractiveTableView.FLAT_PRESENTATION_MENU);
					menuItem.setCustomObject(dimension);
					menuItem.registerOnPress(this);
				}
				else if (oFF.XStringUtils.isNotNullAndNotEmpty(dimension.getHierarchyName()))
				{
					menuItem = this.addMenuItemFor(this.m_hierarchyItems);
					menuItem.setText("Hierarchic display");
					menuItem.setIcon("tree");
					menuItem.setName(oFF.AuGdsInteractiveTableView.ACTIVATE_HIERARCHY_MENU);
					menuItem.setCustomObject(dimension);
					menuItem.registerOnPress(this);
				}
				if (dimension.isHierarchyActive())
				{
					if (caps.supportsExpandBottomUp())
					{
						if (dimension.getLowerLevelNodeAlignment() === oFF.Alignment.CHILDREN_ABOVE_PARENT)
						{
							menuItem = this.addMenuItemFor(this.m_hierarchyItems);
							menuItem.setText("Children below Parent");
							menuItem.setName(oFF.AuGdsInteractiveTableView.EXPAND_TOP_DOWN_MENU);
							menuItem.setCustomObject(dimension);
							menuItem.registerOnPress(this);
						}
						else
						{
							menuItem = this.addMenuItemFor(this.m_hierarchyItems);
							menuItem.setText("Children above Parent");
							menuItem.setName(oFF.AuGdsInteractiveTableView.EXPAND_BOTTOM_UP_MENU);
							menuItem.setCustomObject(dimension);
							menuItem.registerOnPress(this);
						}
					}
					if (dimension.hasNodeCondensation())
					{
						menuItem = this.addMenuItemFor(this.m_hierarchyItems);
						menuItem.setText("Disable node condensation");
						menuItem.setName(oFF.AuGdsInteractiveTableView.DEACTIVATE_NODE_CONDENSATION_MENU);
						menuItem.setCustomObject(dimension);
						menuItem.registerOnPress(this);
					}
					else
					{
						menuItem = this.addMenuItemFor(this.m_hierarchyItems);
						menuItem.setText("Enable node condensation");
						menuItem.setName(oFF.AuGdsInteractiveTableView.ACTIVATE_NODE_CONDENSATION_MENU);
						menuItem.setCustomObject(dimension);
						menuItem.registerOnPress(this);
					}
					if (dimension.getMemberOfPostedNodeVisibility() === oFF.ResultVisibility.ALWAYS)
					{
						menuItem = this.addMenuItemFor(this.m_hierarchyItems);
						menuItem.setText("Hide posted nodes");
						menuItem.setName(oFF.AuGdsInteractiveTableView.HIDE_POSTED_NODES_MENU);
						menuItem.setCustomObject(dimension);
						menuItem.registerOnPress(this);
					}
					else if (dimension.getMemberOfPostedNodeVisibility() === oFF.ResultVisibility.HIDDEN)
					{
						menuItem = this.addMenuItemFor(this.m_hierarchyItems);
						menuItem.setText("Show posted nodes");
						menuItem.setName(oFF.AuGdsInteractiveTableView.SHOW_POSTED_NODES_MENU);
						menuItem.setCustomObject(dimension);
						menuItem.registerOnPress(this);
					}
				}
			}
		}
	}
};
oFF.AuGdsInteractiveTableView.prototype.buildContextMenuItems = function()
{
	var result = this.addMenuGroup(this.m_directItems, 400, "", "", "");
	result = this.addMenuGroup(this.m_moveItems, 2, "Move ...", oFF.AuGdsInteractiveTableView.MOVE_CONTEXT_MENU, "move") || result;
	result = this.addMenuGroup(this.m_sortItems, 2, "Sorting...", oFF.AuGdsInteractiveTableView.SORT_CONTEXT_MENU, "sort") || result;
	result = this.addMenuGroup(this.m_filterItems, 2, "Filter...", oFF.AuGdsInteractiveTableView.FILTER_GROUP_CONTEXT_MENU, "filter") || result;
	result = this.addMenuGroup(this.m_totalsItems, 2, "Result Display ...", oFF.AuGdsInteractiveTableView.TOTALS_CONTEXT_MENU, "sum") || result;
	result = this.addMenuGroup(this.m_hierarchyItems, 2, "Hierarchy settings...", oFF.AuGdsInteractiveTableView.HIERARCHY_CONTEXT_MENU, "tree") || result;
	return this.addMenuGroup(this.m_masterItems, 1, "Advanced settings...", oFF.AuGdsInteractiveTableView.MASTER_CONTEXT_MENU, "provision") || result;
};
oFF.AuGdsInteractiveTableView.prototype.addMenuGroup = function(masterItems, threshold, title, name, icon)
{
	if (oFF.XCollectionUtils.hasElements(masterItems))
	{
		var refItem = this.m_contextMenu;
		if (masterItems.size() > threshold)
		{
			var contextMenu = this.m_contextMenu.addNewItem();
			contextMenu.setName(name);
			contextMenu.setText(title);
			contextMenu.setIcon(icon);
			refItem = contextMenu;
		}
		else
		{
			masterItems.get(0).setSectionStart(true);
		}
		for (var i = 0; i < masterItems.size(); i++)
		{
			refItem.addItem(masterItems.get(i));
		}
		return true;
	}
	return false;
};
oFF.AuGdsInteractiveTableView.prototype.addControlFor = function(masterItems, type)
{
	var result = this.m_genesis.newControl(type);
	masterItems.add(result);
	return result;
};
oFF.AuGdsInteractiveTableView.prototype.addMenuItemFor = function(masterItems)
{
	var result = this.m_genesis.newControl(oFF.UiType.MENU_ITEM);
	masterItems.add(result);
	return result;
};
oFF.AuGdsInteractiveTableView.prototype.resolveDimensionSortType = function(field)
{
	var dimension = field.getDimension();
	if (field === dimension.getKeyField())
	{
		return oFF.SortType.MEMBER_KEY;
	}
	if (field === dimension.getTextField())
	{
		return oFF.SortType.MEMBER_TEXT;
	}
	if (dimension.getMainAttribute() !== null && dimension.getMainAttribute().getFields().contains(field))
	{
		var pt = field.getPresentationType();
		if (pt.isTypeOf(oFF.PresentationType.ABSTRACT_TEXT))
		{
			return oFF.SortType.MEMBER_TEXT;
		}
		if (pt.isTypeOf(oFF.PresentationType.ABSTRACT_KEY))
		{
			return oFF.SortType.MEMBER_KEY;
		}
	}
	return null;
};
oFF.AuGdsInteractiveTableView.prototype.hasFilterOnDimension = function(dimension)
{
	var cartesianProduct = this.getQueryManager().getQueryModel().getFilter().getDynamicFilter().getCartesianProduct();
	return oFF.notNull(cartesianProduct) && oFF.XCollectionUtils.hasElements(cartesianProduct.getCartesianList(dimension));
};
oFF.AuGdsInteractiveTableView.prototype.addStructureMemberFromTuple = function(structureMembers, tuple)
{
	var structureMember = null;
	if (oFF.notNull(tuple))
	{
		for (var i = 0; i < tuple.size(); i++)
		{
			var tupleElement = tuple.getTupleElementAt(i);
			var dimensionMember = tupleElement.getDimensionMember();
			structureMember = tupleElement.getDimension().getStructureMember(dimensionMember.getName());
			if (oFF.notNull(structureMember))
			{
				if (tupleElement.getDimension().isMeasureStructure())
				{
					structureMembers.insert(0, structureMember);
				}
				else
				{
					structureMembers.add(structureMember);
				}
				break;
			}
		}
	}
	return structureMember;
};
oFF.AuGdsInteractiveTableView.prototype.onSubmit = function()
{
	this.updateTable();
};
oFF.AuGdsInteractiveTableView.prototype.onClose = function() {};
oFF.AuGdsInteractiveTableView.prototype.onDataCellOk = function()
{
	this.updateTable();
};
oFF.AuGdsInteractiveTableView.prototype.onDataCellClose = function()
{
	this.m_dcController.close();
};
oFF.AuGdsInteractiveTableView.prototype.onFilterDialogOk = function(selection)
{
	if (oFF.XCollectionUtils.hasElements(selection))
	{
		var firstMember = selection.get(0).getNode().getDimensionMember();
		var dimension = firstMember.getDimension();
		var cartesianList = this.getQueryManager().getQueryModel().getFilter().getDynamicFilter().getCartesianProductWithDefault().getCartesianListWithDefault(dimension);
		for (var i = 0; i < selection.size(); i++)
		{
			var item = selection.get(i);
			var member = item.getNode().getDimensionMember();
			var cartesianElement = cartesianList.addNewCartesianElement();
			cartesianElement.setComparisonOperator(oFF.ComparisonOperator.EQUAL);
			cartesianElement.getLow().setDimensionMember(member);
			cartesianElement.getLow().addSupplementValue(dimension.getDisplayKeyField().getName(), item.getDisplayKey());
			cartesianElement.getLow().addSupplementValue(dimension.getTextField().getName(), item.getText());
		}
	}
	this.updateTable();
};
oFF.AuGdsInteractiveTableView.prototype.onFilterDialogCancel = function() {};
oFF.AuGdsInteractiveTableView.prototype.onPress = function(event)
{
	var control = event.getControl();
	var controlParent = control.getParent();
	if (oFF.notNull(controlParent))
	{
		var customObject = control.getCustomObject();
		switch (control.getName())
		{
			case oFF.AuGdsInteractiveTableView.LAYOUT_BTN:
				this.openLayoutDialog();
				break;

			case oFF.AuGdsInteractiveTableView.DATACELL_MENU:
				this.openDataCellDialogForMember(customObject);
				break;

			case oFF.AuGdsInteractiveTableView.MEMBER_UP_MENU:
				this.moveStructureMember(customObject, -1);
				break;

			case oFF.AuGdsInteractiveTableView.MEMBER_TO_LEFT_MENU:
				this.moveStructureMember(customObject, -1);
				break;

			case oFF.AuGdsInteractiveTableView.MEMBER_DOWN_MENU:
				this.moveStructureMember(customObject, 1);
				break;

			case oFF.AuGdsInteractiveTableView.MEMBER_TO_RIGHT_MENU:
				this.moveStructureMember(customObject, 1);
				break;

			case oFF.AuGdsInteractiveTableView.ACTIVATE_UDH_MENU:
				this.getQueryManager().getConvenienceCommands().setUniversalDisplayHierarchy(customObject.getDimensionNames().createListOfStringCopy(), -1, true);
				this.updateTable();
				break;

			case oFF.AuGdsInteractiveTableView.DE_ACTIVATE_UDH_MENU:
				this.getQueryManager().getQueryModel().getUniversalDisplayHierarchies().getByAxisType(customObject.getType()).setActive(false);
				this.updateTable();
				break;

			case oFF.AuGdsInteractiveTableView.TOTALS_ABOVE_MENU:
				customObject.getResultStructureController().setResultAlignment(oFF.ResultAlignment.TOP);
				this.updateTable();
				break;

			case oFF.AuGdsInteractiveTableView.TOTALS_ABOVE_AND_BELOW_MENU:
				customObject.getResultStructureController().setResultAlignment(oFF.ResultAlignment.TOPBOTTOM);
				this.updateTable();
				break;

			case oFF.AuGdsInteractiveTableView.TOTALS_BELOW_MENU:
				customObject.getResultStructureController().setResultAlignment(oFF.ResultAlignment.BOTTOM);
				this.updateTable();
				break;

			case oFF.AuGdsInteractiveTableView.HIDE_TOTALS_MENU:
				customObject.getResultStructureController().setResultAlignment(oFF.ResultAlignment.NONE);
				this.updateTable();
				break;

			case oFF.AuGdsInteractiveTableView.SUPRESS_ZEROS_MENU:
				customObject.setZeroSuppressionType(oFF.ZeroSuppressionType.ALL_CELLS_ARE_ZERO);
				this.updateTable();
				break;

			case oFF.AuGdsInteractiveTableView.SHOW_ZEROS_MENU:
				customObject.setZeroSuppressionType(oFF.ZeroSuppressionType.NONE);
				this.updateTable();
				break;

			case oFF.AuGdsInteractiveTableView.DIMENSION_CONTEXT_MENU:
				oFF.DdEntryPoint.createEntryPoint(this.m_application).openDimensionDialog(oFF.XStringUtils.concatenate3(customObject.getName(), "/", customObject.getText()), customObject, this);
				break;

			case oFF.AuGdsInteractiveTableView.FILTER_CONTEXT_MENU:
				var entryPoint = oFF.FdEntryPoint.createEntryPoint(this.m_application, oFF.XStringUtils.concatenate3(customObject.getName(), "/", customObject.getText()));
				entryPoint.getConfiguration().setSelectionMode(oFF.UiSelectionMode.MULTI_SELECT);
				entryPoint.openWithDimension(customObject, this);
				break;

			case oFF.AuGdsInteractiveTableView.FILTER_SELECTION_CONTEXT_MENU:
				this.filterOnSelection(customObject);
				break;

			case oFF.AuGdsInteractiveTableView.SORT_ASC_MENU:
				this.sortByDimensionField(oFF.XSortDirection.ASCENDING, customObject);
				break;

			case oFF.AuGdsInteractiveTableView.SORT_DESC_MENU:
				this.sortByDimensionField(oFF.XSortDirection.DESCENDING, customObject);
				break;

			case oFF.AuGdsInteractiveTableView.SORT_DEFAULT_MENU:
				this.sortByDimensionField(oFF.XSortDirection.DEFAULT_VALUE, customObject);
				break;

			case oFF.AuGdsInteractiveTableView.SHOW_MASTERDATA_MENU:
				customObject.setReadModeGraceful(oFF.QContextType.RESULT_SET, oFF.QMemberReadMode.MASTER);
				this.updateTable();
				break;

			case oFF.AuGdsInteractiveTableView.HIDE_MASTERDATA_MENU:
				customObject.setReadModeGraceful(oFF.QContextType.RESULT_SET, oFF.QMemberReadMode.BOOKED);
				this.updateTable();
				break;

			case oFF.AuGdsInteractiveTableView.ACTIVATE_HIERARCHY_MENU:
				customObject.setHierarchyActive(true);
				this.updateTable();
				break;

			case oFF.AuGdsInteractiveTableView.FLAT_PRESENTATION_MENU:
				customObject.setHierarchyActive(false);
				this.updateTable();
				break;

			case oFF.AuGdsInteractiveTableView.EXPAND_BOTTOM_UP_MENU:
				customObject.setLowerLevelNodeAlignment(oFF.Alignment.CHILDREN_ABOVE_PARENT);
				this.updateTable();
				break;

			case oFF.AuGdsInteractiveTableView.EXPAND_TOP_DOWN_MENU:
				customObject.setLowerLevelNodeAlignment(oFF.Alignment.CHILDREN_BELOW_PARENT);
				this.updateTable();
				break;

			case oFF.AuGdsInteractiveTableView.ACTIVATE_NODE_CONDENSATION_MENU:
				customObject.setHasNodeCondensation(true);
				this.updateTable();
				break;

			case oFF.AuGdsInteractiveTableView.DEACTIVATE_NODE_CONDENSATION_MENU:
				customObject.setHasNodeCondensation(false);
				this.updateTable();
				break;

			case oFF.AuGdsInteractiveTableView.HIDE_POSTED_NODES_MENU:
				customObject.setMemberOfPostedNodeVisibility(oFF.ResultVisibility.HIDDEN);
				this.updateTable();
				break;

			case oFF.AuGdsInteractiveTableView.SHOW_POSTED_NODES_MENU:
				customObject.setMemberOfPostedNodeVisibility(oFF.ResultVisibility.ALWAYS);
				this.updateTable();
				break;

			case oFF.AuGdsInteractiveTableView.FILTER_CLEAR_MENU:
				this.clearFilter(customObject);
				break;

			case oFF.AuGdsInteractiveTableView.LEVEL_UP_MENU:
				this.moveDimensions(customObject, -1);
				break;

			case oFF.AuGdsInteractiveTableView.LEVEL_DOWN_MENU:
				this.moveDimensions(customObject, 1);
				break;

			case oFF.AuGdsInteractiveTableView.MOVE_TO_COL_MENU:
				this.moveToAxis(customObject, oFF.AxisType.COLUMNS);
				break;

			case oFF.AuGdsInteractiveTableView.MOVE_TO_ROW_MENU:
				this.moveToAxis(customObject, oFF.AxisType.ROWS);
				break;

			case oFF.AuGdsInteractiveTableView.MOVE_TO_FREE_MENU:
				this.moveToAxis(customObject, oFF.AxisType.FREE);
				break;

			case oFF.AuGdsInteractiveTableView.COLLAPSE_MENU:
				this.applyDrillToElements(customObject, oFF.DrillState.COLLAPSED);
				break;

			case oFF.AuGdsInteractiveTableView.DRILL_MENU:
				this.applyDrillToElements(customObject, oFF.DrillState.DRILLED);
				break;

			case oFF.AuGdsInteractiveTableView.EXPAND_MENU:
				this.applyDrillToElements(customObject, oFF.DrillState.EXPANDED);
				break;

			case oFF.AuGdsInteractiveTableView.UDH_ROW_TOGGLE:
				this.toggleUdh(oFF.AxisType.ROWS, control.isPressed());
				break;

			default:
		}
	}
};
oFF.AuGdsInteractiveTableView.prototype.toggleUdh = function(axisType, active)
{
	if (active)
	{
		this.getQueryManager().getConvenienceCommands().setUniversalDisplayHierarchy(this.getQueryManager().getQueryModel().getAxis(axisType).getDimensionNames().createListOfStringCopy(), -1, true);
	}
	else
	{
		this.getQueryManager().getQueryModel().getUniversalDisplayHierarchies().getByAxisType(axisType).setActive(false);
	}
	this.updateTable();
};
oFF.AuGdsInteractiveTableView.prototype.filterOnSelection = function(tupleElements)
{
	var dimension = tupleElements.get(0).getDimension();
	var cartesianList = this.getQueryManager().getQueryModel().getFilter().getDynamicFilter().getCartesianProductWithDefault().getCartesianListWithDefault(dimension);
	cartesianList.clear();
	for (var i = 0; i < tupleElements.size(); i++)
	{
		var element = tupleElements.get(i);
		var member = element.getDimensionMember();
		if (!member.getMemberType().isTypeOf(oFF.OlapComponentType.TOTALS) && !member.getMemberType().isTypeOf(oFF.MemberType.RESULT))
		{
			cartesianList.addNewCartesianElement().configureSingleParameterExpression(member.getFieldValue(dimension.getKeyField()).getValue(), oFF.ComparisonOperator.EQUAL);
		}
	}
	this.updateTable();
};
oFF.AuGdsInteractiveTableView.prototype.applyDrillToElements = function(elements, drillState)
{
	for (var i = 0; i < elements.size(); i++)
	{
		elements.get(i).setNextDrillState(drillState);
	}
	this.updateTable();
};
oFF.AuGdsInteractiveTableView.prototype.moveToAxis = function(dimensions, axisType)
{
	var cmd = this.getQueryManager().getConvenienceCommands();
	for (var i = 0; i < dimensions.size(); i++)
	{
		cmd.moveDimensionToAxis(dimensions.get(i).getName(), axisType);
	}
	this.updateTable();
};
oFF.AuGdsInteractiveTableView.prototype.moveStructureMember = function(structureMember, offset)
{
	var dimension = structureMember.getDimension();
	var structureLayout = oFF.XListOfNameObject.create();
	structureLayout.addAll(dimension.getStructureLayout());
	var index = structureLayout.getIndex(structureMember);
	structureLayout.removeAt(index);
	structureLayout.insert(index + offset, structureMember);
	dimension.setStructuredLayout(structureLayout);
	if (this.getQueryManager().getSystemType().isTypeOf(oFF.SystemType.BW))
	{
		var dimensionSorting = this.getQueryManager().getQueryModel().getSortingManager().getDimensionSorting(dimension, true);
		dimensionSorting.setSortByKey();
		dimensionSorting.setDirection(oFF.XSortDirection.ASCENDING);
		dimensionSorting.setCustomSort(oFF.XStream.of(structureLayout).collect(oFF.XStreamCollector.toListOfString( function(input){
			return input.getName();
		}.bind(this))));
	}
	else
	{
		this.getQueryManager().getQueryModel().getSortingManager().removeDimensionSorting(dimension);
	}
	this.updateTable();
};
oFF.AuGdsInteractiveTableView.prototype.moveDimensions = function(dimensionList, offset)
{
	var axis = dimensionList.get(0).getAxis();
	var dimension;
	var index = 0;
	var i;
	for (i = dimensionList.size() - 1; i >= 0; i--)
	{
		dimension = dimensionList.get(i);
		index = axis.getIndex(dimension);
		axis.removeAt(index);
	}
	for (i = 0; i < dimensionList.size(); i++)
	{
		axis.insert(index + offset + i, dimensionList.get(i));
	}
	this.updateTable();
};
oFF.AuGdsInteractiveTableView.prototype.sortByDimensionField = function(direction, field)
{
	var caps = this.getQueryManager().getModelCapabilities();
	var dimension = field.getDimension();
	var presentationType = field.getPresentationType();
	var dimSortType = this.resolveDimensionSortType(field);
	if (caps.supportsFieldSorting(field))
	{
		this.getQueryManager().getConvenienceCommands().sort(oFF.SortType.FIELD, dimension.getDimensionType(), dimension.getName(), presentationType, field.getName(), null, direction);
	}
	else if (oFF.notNull(dimSortType) && caps.supportsDimensionSorting(dimension, dimSortType))
	{
		this.getQueryManager().getConvenienceCommands().sort(dimSortType, dimension.getDimensionType(), dimension.getName(), presentationType, null, null, direction);
	}
	this.updateTable();
};
oFF.AuGdsInteractiveTableView.prototype.clearFilter = function(dimension)
{
	this.getQueryManager().getQueryModel().getFilter().getDynamicFilter().getCartesianProductWithDefault().removeByDimensionName(dimension.getName());
	this.updateTable();
};
oFF.AuGdsInteractiveTableView.prototype.openDataCellDialogForMember = function(structureMembers)
{
	var displayManager = oFF.OlapUiDisplayFactory.createFactoryForDialog(this.m_application.getProcess().getUiManager());
	var context = oFF.OlapUiContext.createContext(this.m_application.getProcess().getUiManager(), displayManager);
	if (oFF.isNull(this.m_dcController))
	{
		this.m_dcController = oFF.DataCellController.create(context);
	}
	if (structureMembers.size() === 1)
	{
		this.m_dcController.openDataCellPropertiesDialog(this, this.getQueryManager(), structureMembers.get(0).getName(), null, false);
	}
	else if (structureMembers.size() === 2)
	{
		if (structureMembers.get(0).getDimension().isMeasureStructure())
		{
			this.m_dcController.openDataCellPropertiesDialog(this, this.getQueryManager(), structureMembers.get(0).getName(), structureMembers.get(1).getName(), true);
		}
		else
		{
			this.m_dcController.openDataCellPropertiesDialog(this, this.getQueryManager(), structureMembers.get(1).getName(), structureMembers.get(0).getName(), true);
		}
	}
};
oFF.AuGdsInteractiveTableView.prototype.openLayoutDialog = function()
{
	var aldOceanEntryPoint = oFF.AldEntryPoint.createEntryPoint(this.m_application);
	aldOceanEntryPoint.openAldDialog("Axis layout", this.getQueryManager().getQueryModel(), this);
};
oFF.AuGdsInteractiveTableView.prototype.processSelectionChangeEvent = function(event)
{
	var selectionString = event.getParameters().getStringByKey(oFF.UiControlEvent.PARAM_SELECTION_AREA);
	if (oFF.notNull(selectionString))
	{
		var selectionElement = oFF.JsonParserFactory.createFromString(selectionString);
		if (oFF.notNull(selectionElement) && selectionElement.isStructure())
		{
			var selectionStructure = selectionElement.asStructure();
			var startCol = selectionStructure.getIntegerByKey(oFF.SacTableConstants.CCD_N_START_COL);
			var endCol = selectionStructure.getIntegerByKey(oFF.SacTableConstants.CCD_N_END_COL);
			var startRow = selectionStructure.getIntegerByKey(oFF.SacTableConstants.CCD_N_START_ROW);
			var endRow = selectionStructure.getIntegerByKey(oFF.SacTableConstants.CCD_N_END_ROW);
			this.m_columnMin = oFF.XMath.min(startCol, endCol);
			this.m_columnMax = oFF.XMath.max(startCol, endCol);
			this.m_rowMin = oFF.XMath.min(startRow, endRow);
			this.m_rowMax = oFF.XMath.max(startRow, endRow);
		}
	}
};
oFF.AuGdsInteractiveTableView.prototype.getToolbarItems = function()
{
	this.m_toolbarItems.clear();
	var button = this.addControlFor(this.m_toolbarItems, oFF.UiType.BUTTON);
	button.setTooltip("Layout ...");
	button.setIcon("chart-axis");
	button.setName(oFF.AuGdsInteractiveTableView.LAYOUT_BTN);
	button.registerOnPress(this);
	var caps = this.getQueryManager().getModelCapabilities();
	if (caps.supportsUniversalDisplayHierarchies())
	{
		var axis = this.getQueryManager().getQueryModel().getRowsAxis();
		var dimensions = axis.getDimensions();
		var isUniversalDisplayHierarchyDimension = this.getQueryManager().getQueryModel().getUniversalDisplayHierarchies().getByAxisType(oFF.AxisType.ROWS).isActive();
		var toggleButton = this.addControlFor(this.m_toolbarItems, oFF.UiType.TOGGLE_BUTTON);
		toggleButton.setTooltip("Activate UDH on rows");
		toggleButton.setIcon("tree");
		toggleButton.setName(oFF.AuGdsInteractiveTableView.UDH_ROW_TOGGLE);
		toggleButton.setPressed(isUniversalDisplayHierarchyDimension);
		toggleButton.setEnabled(isUniversalDisplayHierarchyDimension || oFF.notNull(dimensions) && dimensions.size() > 1);
		toggleButton.registerOnPress(this);
	}
	var resolver = this.m_sacTable.getCustomObject();
	if (oFF.notNull(resolver) && this.m_rowMax > -1 && this.m_columnMax > -1)
	{
		var selectedRowDimensions = resolver.getRowDimensions(this.m_columnMin, this.m_columnMax);
		var selectedColumnDimensions = resolver.getColumnDimensions(this.m_rowMin, this.m_rowMax);
		var selectedColumnTupleElements = null;
		var selectedRowTupleElements = null;
		var selectedColumnTuples = resolver.getColumnTuples(this.m_columnMin, this.m_columnMax);
		var selectedRowTuples = resolver.getRowTuples(this.m_rowMin, this.m_rowMax);
		if (this.m_rowMin === this.m_rowMax)
		{
			selectedColumnTupleElements = resolver.getColumnTupleElements(this.m_columnMin, this.m_columnMax, this.m_rowMin);
		}
		if (this.m_columnMin === this.m_columnMax)
		{
			selectedRowTupleElements = resolver.getRowTupleElements(this.m_columnMin, this.m_rowMin, this.m_rowMax);
		}
		if (oFF.XCollectionUtils.hasElements(selectedColumnDimensions) || oFF.XCollectionUtils.hasElements(selectedRowDimensions) || oFF.XCollectionUtils.hasElements(selectedColumnTupleElements) || oFF.XCollectionUtils.hasElements(selectedRowTupleElements) || oFF.XCollectionUtils.hasElements(selectedColumnTuples) || oFF.XCollectionUtils.hasElements(selectedRowTuples))
		{
			if (oFF.XCollectionUtils.hasElements(selectedColumnDimensions))
			{
				this.createContextSensitiveToolbarItems(selectedColumnDimensions, selectedColumnTupleElements);
			}
			else if (oFF.XCollectionUtils.hasElements(selectedRowDimensions))
			{
				this.createContextSensitiveToolbarItems(selectedRowDimensions, selectedRowTupleElements);
			}
		}
	}
	return this.m_toolbarItems;
};
oFF.AuGdsInteractiveTableView.prototype.createContextSensitiveToolbarItems = function(dimensions, tupleElements)
{
	this.addControlFor(this.m_toolbarItems, oFF.UiType.SPACER);
	var button;
	var dimensionsRemapped = null;
	if (oFF.notNull(dimensions))
	{
		dimensionsRemapped = oFF.XStream.of(dimensions).map( function(orig){
			return this.getQueryManager().getQueryModel().getDimensionByName(orig.getName());
		}.bind(this)).collect(oFF.XStreamCollector.toList());
	}
	if (dimensionsRemapped.hasElements())
	{
		if (!dimensionsRemapped.get(0).isUniversalDisplayHierarchyDimension())
		{
			var axis = dimensionsRemapped.get(0).getAxis();
			var axisSize = axis.size();
			if (axisSize > 0)
			{
				var axisIndexMin = axis.getIndex(dimensionsRemapped.get(0));
				var axisIndexMax = axis.getIndex(dimensionsRemapped.get(dimensionsRemapped.size() - 1));
				if (axisIndexMin > 0)
				{
					button = this.addControlFor(this.m_toolbarItems, oFF.UiType.BUTTON);
					if (axis.getType() === oFF.AxisType.ROWS)
					{
						button.setTooltip("Move left");
						button.setIcon("arrow-left");
					}
					else
					{
						button.setTooltip("Move up");
						button.setIcon("arrow-top");
					}
					button.setName(oFF.AuGdsInteractiveTableView.LEVEL_UP_MENU);
					button.setCustomObject(dimensionsRemapped);
					button.registerOnPress(this);
				}
				if (axisIndexMax < axisSize - 1)
				{
					button = this.addControlFor(this.m_toolbarItems, oFF.UiType.BUTTON);
					if (axis.getType() === oFF.AxisType.ROWS)
					{
						button.setTooltip("Move right");
						button.setIcon("arrow-right");
					}
					else
					{
						button.setTooltip("Move down");
						button.setIcon("arrow-bottom");
					}
					button.setName(oFF.AuGdsInteractiveTableView.LEVEL_DOWN_MENU);
					button.setCustomObject(dimensionsRemapped);
					button.registerOnPress(this);
				}
			}
			var dimensionsToMove;
			dimensionsToMove = axis.getType() === oFF.AxisType.COLUMNS ? null : oFF.XStream.of(dimensionsRemapped).filter( function(rmFF){
				return rmFF.supportsAxis(oFF.AxisType.COLUMNS);
			}.bind(this)).collect(oFF.XStreamCollector.toList());
			if (oFF.XCollectionUtils.hasElements(dimensionsToMove))
			{
				button = this.addControlFor(this.m_toolbarItems, oFF.UiType.BUTTON);
				button.setTooltip("Move to Columns");
				button.setIcon("table-column");
				button.setName(oFF.AuGdsInteractiveTableView.MOVE_TO_COL_MENU);
				button.setCustomObject(dimensionsToMove);
				button.registerOnPress(this);
			}
			dimensionsToMove = axis.getType() === oFF.AxisType.ROWS ? null : oFF.XStream.of(dimensionsRemapped).filter( function(rmFF1){
				return rmFF1.supportsAxis(oFF.AxisType.ROWS);
			}.bind(this)).collect(oFF.XStreamCollector.toList());
			if (oFF.XCollectionUtils.hasElements(dimensionsToMove))
			{
				button = this.addControlFor(this.m_toolbarItems, oFF.UiType.BUTTON);
				button.setTooltip("Move to Rows");
				button.setIcon("table-row");
				button.setName(oFF.AuGdsInteractiveTableView.MOVE_TO_ROW_MENU);
				button.setCustomObject(dimensionsToMove);
				button.registerOnPress(this);
			}
			dimensionsToMove = oFF.XStream.of(dimensionsRemapped).filter( function(rmFF2){
				return rmFF2.supportsAxis(oFF.AxisType.FREE);
			}.bind(this)).collect(oFF.XStreamCollector.toList());
			if (oFF.XCollectionUtils.hasElements(dimensionsToMove))
			{
				button = this.addControlFor(this.m_toolbarItems, oFF.UiType.BUTTON);
				button.setTooltip("Remove from Axis");
				button.setIcon("delete");
				button.setName(oFF.AuGdsInteractiveTableView.MOVE_TO_FREE_MENU);
				button.setCustomObject(dimensionsToMove);
				button.registerOnPress(this);
			}
			if (dimensionsRemapped.size() === 1)
			{
				var dimension = dimensionsRemapped.get(0);
				if (this.hasFilterOnDimension(dimension))
				{
					button = this.addControlFor(this.m_toolbarItems, oFF.UiType.BUTTON);
					button.setTooltip("Clear filter  ");
					button.setIcon("clear-filter");
					button.setName(oFF.AuGdsInteractiveTableView.FILTER_CLEAR_MENU);
					button.setCustomObject(dimension);
					button.registerOnPress(this);
				}
				button = this.addControlFor(this.m_toolbarItems, oFF.UiType.BUTTON);
				button.setTooltip("Add filter");
				button.setIcon("add-filter");
				button.setName(oFF.AuGdsInteractiveTableView.FILTER_CONTEXT_MENU);
				button.setCustomObject(dimension);
				button.registerOnPress(this);
				if (oFF.XCollectionUtils.hasElements(tupleElements))
				{
					button = this.addControlFor(this.m_toolbarItems, oFF.UiType.BUTTON);
					button.setTooltip("Filter Selection");
					button.setIcon("filter");
					button.setName(oFF.AuGdsInteractiveTableView.FILTER_SELECTION_CONTEXT_MENU);
					button.setCustomObject(tupleElements);
					button.registerOnPress(this);
				}
				button = this.addControlFor(this.m_toolbarItems, oFF.UiType.BUTTON);
				button.setTooltip("Dimension Settings ...");
				button.setIcon("dimension");
				button.setName(oFF.AuGdsInteractiveTableView.DIMENSION_CONTEXT_MENU);
				button.setCustomObject(dimension);
				button.registerOnPress(this);
				if (false && dimension.getFieldLayoutType() === oFF.FieldLayoutType.ATTRIBUTE_BASED)
				{
					if (dimension.getKeyField() !== null && dimension.getTextField() !== null)
					{
						var dropdown = this.addControlFor(this.m_toolbarItems, oFF.UiType.DROPDOWN);
						dropdown.setName(oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN);
						dropdown.setCustomObject(dimension);
						dropdown.addNewItem().setText("Text").setName(oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN_TEXT);
						dropdown.addNewItem().setText("Key").setName(oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN_KEY);
						dropdown.addNewItem().setText("Key and Text").setName(oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN_KEY_TEXT);
						dropdown.addNewItem().setText("Text and Key").setName(oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN_TEXT_KEY);
						dropdown.registerOnSelect(this);
						var selectedName = null;
						var resultSetFields = dimension.getMainAttribute().getResultSetFields();
						for (var i = 0; i < resultSetFields.size(); i++)
						{
							var presentationType = resultSetFields.get(i).getPresentationType();
							if (presentationType.isTypeOf(oFF.PresentationType.ABSTRACT_TEXT))
							{
								if (oFF.isNull(selectedName))
								{
									selectedName = oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN_TEXT;
								}
								else if (oFF.XString.isEqual(selectedName, oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN_KEY))
								{
									selectedName = oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN_KEY_TEXT;
								}
							}
							else if (presentationType.isTypeOf(oFF.PresentationType.ABSTRACT_KEY))
							{
								if (oFF.isNull(selectedName))
								{
									selectedName = oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN_KEY;
								}
								else if (oFF.XString.isEqual(selectedName, oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN_TEXT))
								{
									selectedName = oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN_TEXT_KEY;
								}
							}
						}
						dropdown.setSelectedName(selectedName);
					}
				}
			}
		}
	}
	if (oFF.XCollectionUtils.hasElements(tupleElements))
	{
		var elements = oFF.XStream.of(tupleElements).filter( function(te){
			return oFF.AuGdsInteractiveTableView.supportsTupleElementExpand(te);
		}.bind(this)).collect(oFF.XStreamCollector.toList());
		if (oFF.XCollectionUtils.hasElements(elements) && elements.size() > 1)
		{
			button = this.addControlFor(this.m_toolbarItems, oFF.UiType.BUTTON);
			button.setTooltip("Expand");
			button.setIcon("expand-all");
			button.setName(oFF.AuGdsInteractiveTableView.EXPAND_MENU);
			button.setCustomObject(elements);
			button.registerOnPress(this);
		}
		elements = oFF.XStream.of(tupleElements).filter( function(te2){
			return oFF.AuGdsInteractiveTableView.supportsTupleElementDrill(te2);
		}.bind(this)).collect(oFF.XStreamCollector.toList());
		if (oFF.XCollectionUtils.hasElements(elements) && elements.size() > 1)
		{
			button = this.addControlFor(this.m_toolbarItems, oFF.UiType.BUTTON);
			button.setTooltip("Drill");
			button.setIcon("expand-all");
			button.setName(oFF.AuGdsInteractiveTableView.DRILL_MENU);
			button.setCustomObject(elements);
			button.registerOnPress(this);
		}
		elements = oFF.XStream.of(tupleElements).filter( function(te3){
			return oFF.AuGdsInteractiveTableView.supportsTupleElementCollapse(te3);
		}.bind(this)).collect(oFF.XStreamCollector.toList());
		if (oFF.XCollectionUtils.hasElements(elements) && elements.size() > 1)
		{
			button = this.addControlFor(this.m_toolbarItems, oFF.UiType.BUTTON);
			button.setTooltip("Collapse");
			button.setIcon("collapse-all");
			button.setName(oFF.AuGdsInteractiveTableView.COLLAPSE_MENU);
			button.setCustomObject(elements);
			button.registerOnPress(this);
		}
	}
};
oFF.AuGdsInteractiveTableView.prototype.prepareMultiSelectMenu = function(resolver)
{
	var multiSelect = this.m_rowMax > -1 && this.m_columnMax > -1 && (this.m_columnMin !== this.m_columnMax || this.m_rowMin !== this.m_rowMax);
	if (multiSelect)
	{
		var selectedRowDimensions = resolver.getRowDimensions(this.m_columnMin, this.m_columnMax);
		var selectedColumnDimensions = resolver.getColumnDimensions(this.m_rowMin, this.m_rowMax);
		var selectedColumnTupleElements = null;
		var selectedRowTupleElements = null;
		var selectedColumnTuples = resolver.getColumnTuples(this.m_columnMin, this.m_columnMax);
		var selectedRowTuples = resolver.getRowTuples(this.m_rowMin, this.m_rowMax);
		var onHeaderRows = resolver.isOnHeaderRow(this.m_rowMax);
		var onHeaderColumns = resolver.isOnHeaderColumn(this.m_columnMax);
		var onDataRows = resolver.isOnDataRow(this.m_rowMin);
		var onDataColumns = resolver.isOnDataColumn(this.m_columnMin);
		if (this.m_rowMin === this.m_rowMax)
		{
			selectedColumnTupleElements = resolver.getColumnTupleElements(this.m_columnMin, this.m_columnMax, this.m_rowMin);
		}
		if (this.m_columnMin === this.m_columnMax)
		{
			selectedRowTupleElements = resolver.getRowTupleElements(this.m_columnMin, this.m_rowMin, this.m_rowMax);
		}
		if (oFF.XCollectionUtils.hasElements(selectedColumnDimensions) || oFF.XCollectionUtils.hasElements(selectedRowDimensions) || oFF.XCollectionUtils.hasElements(selectedColumnTupleElements) || oFF.XCollectionUtils.hasElements(selectedRowTupleElements) || oFF.XCollectionUtils.hasElements(selectedColumnTuples) || oFF.XCollectionUtils.hasElements(selectedRowTuples))
		{
			if (onHeaderRows && !onDataRows && !onDataColumns && oFF.XCollectionUtils.hasElements(selectedColumnDimensions))
			{
				this.createDimensionMenu(selectedColumnDimensions, null);
			}
			if (onHeaderColumns && !onDataRows && !onDataColumns && !onHeaderRows && oFF.XCollectionUtils.hasElements(selectedRowDimensions))
			{
				this.createDimensionMenu(selectedRowDimensions, null);
			}
			this.createTupleElementMenu(selectedRowTupleElements);
			this.createTupleElementMenu(selectedColumnTupleElements);
			return true;
		}
	}
	return false;
};
oFF.AuGdsInteractiveTableView.prototype.createTupleElementMenu = function(tupleElements)
{
	if (oFF.XCollectionUtils.hasElements(tupleElements))
	{
		var elements = oFF.XStream.of(tupleElements).filter( function(te){
			return oFF.AuGdsInteractiveTableView.supportsTupleElementExpand(te);
		}.bind(this)).collect(oFF.XStreamCollector.toList());
		var menuItem;
		if (oFF.XCollectionUtils.hasElements(elements) && elements.size() > 1)
		{
			menuItem = this.addMenuItemFor(this.m_directItems);
			menuItem.setText("Expand");
			menuItem.setIcon("expand-all");
			menuItem.setName(oFF.AuGdsInteractiveTableView.EXPAND_MENU);
			menuItem.setCustomObject(elements);
			menuItem.registerOnPress(this);
		}
		elements = oFF.XStream.of(tupleElements).filter( function(te2){
			return oFF.AuGdsInteractiveTableView.supportsTupleElementDrill(te2);
		}.bind(this)).collect(oFF.XStreamCollector.toList());
		if (oFF.XCollectionUtils.hasElements(elements) && elements.size() > 1)
		{
			menuItem = this.addMenuItemFor(this.m_directItems);
			menuItem.setText("Drill");
			menuItem.setIcon("expand-all");
			menuItem.setName(oFF.AuGdsInteractiveTableView.DRILL_MENU);
			menuItem.setCustomObject(elements);
			menuItem.registerOnPress(this);
		}
		elements = oFF.XStream.of(tupleElements).filter( function(te3){
			return oFF.AuGdsInteractiveTableView.supportsTupleElementCollapse(te3);
		}.bind(this)).collect(oFF.XStreamCollector.toList());
		if (oFF.XCollectionUtils.hasElements(elements) && elements.size() > 1)
		{
			menuItem = this.addMenuItemFor(this.m_directItems);
			menuItem.setText("Collapse");
			menuItem.setIcon("collapse-all");
			menuItem.setName(oFF.AuGdsInteractiveTableView.COLLAPSE_MENU);
			menuItem.setCustomObject(elements);
			menuItem.registerOnPress(this);
		}
		menuItem = this.addMenuItemFor(this.m_filterItems);
		menuItem.setText("Filter Selection");
		menuItem.setIcon("filter");
		menuItem.setName(oFF.AuGdsInteractiveTableView.FILTER_SELECTION_CONTEXT_MENU);
		menuItem.setCustomObject(tupleElements);
		menuItem.registerOnPress(this);
	}
};
oFF.AuGdsInteractiveTableView.prototype.onClick = function(event) {};
oFF.AuGdsInteractiveTableView.prototype.onButtonPress = function(event)
{
	var parameters = event.getParameters();
	var pressedButtonType = oFF.UiPressedButtonType.lookup(parameters.getStringByKey(oFF.UiControlEvent.PARAM_PRESSED_BUTTON_TYPE));
	if (pressedButtonType === oFF.UiPressedButtonType.DRILL)
	{
		var column = parameters.getIntegerByKey(oFF.UiControlEvent.PARAM_COLUMN);
		var row = parameters.getIntegerByKey(oFF.UiControlEvent.PARAM_ROW);
		var resolver = event.getControl().getCustomObject();
		var tupleElement = resolver.getColumnTupleElement(column, row);
		if (oFF.isNull(tupleElement))
		{
			tupleElement = resolver.getRowTupleElement(column, row);
		}
		if (oFF.notNull(tupleElement))
		{
			if (oFF.AuGdsInteractiveTableView.supportsTupleElementCollapse(tupleElement))
			{
				tupleElement.setNextDrillState(oFF.DrillState.COLLAPSED);
			}
			else if (oFF.AuGdsInteractiveTableView.supportsTupleElementDrill(tupleElement))
			{
				tupleElement.setNextDrillState(oFF.DrillState.DRILLED);
			}
			else if (oFF.AuGdsInteractiveTableView.supportsTupleElementExpand(tupleElement))
			{
				tupleElement.setNextDrillState(oFF.DrillState.EXPANDED);
			}
		}
		this.updateTable();
	}
};
oFF.AuGdsInteractiveTableView.prototype.onQueryExecuted = function(extResult, resultSetContainer, customIdentifier)
{
	if (extResult.hasErrors())
	{
		this.m_genesis.showErrorToast(extResult.getSummary());
		return;
	}
	this.rerenderTable();
	var customIdentifierStrVal = customIdentifier;
	if (oFF.isNull(customIdentifierStrVal) || !oFF.XString.isEqual(customIdentifierStrVal.getString(), oFF.AuGdsInteractiveTableView.UNDO_REDO_ACTION_ID))
	{
		this.m_application.getProcess().notifyInterruptStep(oFF.XInterruptStep.create(), false);
	}
	this.m_queryExecutedListener.onQueryExecuted(extResult, resultSetContainer, customIdentifier);
};
oFF.AuGdsInteractiveTableView.prototype.undoRedoActionFinished = function(extResult, undoSupport, customIdentifier)
{
	this.m_queryManager.getActiveResultSetContainer().processExecution(oFF.SyncType.NON_BLOCKING, this, oFF.XStringValue.create(oFF.AuGdsInteractiveTableView.UNDO_REDO_ACTION_ID));
};
oFF.AuGdsInteractiveTableView.prototype.onSelect = function(event)
{
	var control = event.getControl();
	switch (control.getName())
	{
		case oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN:
			var dim = control.getCustomObject();
			var cmd = this.getQueryManager().getConvenienceCommands();
			var dimName = dim.getName();
			var attName = dim.getMainAttribute().getName();
			cmd.clearAllAttributeFields(dimName, attName, oFF.QContextType.RESULT_SET);
			var keyView = dim.getKeyField() !== null ? dim.getKeyField().getPresentationType() : null;
			var textView = dim.getTextField() !== null ? dim.getTextField().getPresentationType() : null;
			switch (control.getSelectedItem().getName())
			{
				case oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN_KEY:
					cmd.addAttributeField(null, dimName, attName, keyView, null, oFF.QContextType.RESULT_SET);
					break;

				case oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN_TEXT:
					cmd.addAttributeField(null, dimName, attName, textView, null, oFF.QContextType.RESULT_SET);
					break;

				case oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN_KEY_TEXT:
					cmd.addAttributeField(null, dimName, attName, keyView, null, oFF.QContextType.RESULT_SET);
					cmd.addAttributeField(null, dimName, attName, textView, null, oFF.QContextType.RESULT_SET);
					break;

				case oFF.AuGdsInteractiveTableView.ATTRIBUTE_DROPDOWN_TEXT_KEY:
					cmd.addAttributeField(null, dimName, attName, textView, null, oFF.QContextType.RESULT_SET);
					cmd.addAttributeField(null, dimName, attName, keyView, null, oFF.QContextType.RESULT_SET);
					break;
			}
			this.updateTable();
			break;

		default:
	}
};

oFF.AuGdsNavigationPanel = function() {};
oFF.AuGdsNavigationPanel.prototype = new oFF.XObjectExt();
oFF.AuGdsNavigationPanel.prototype._ff_c = "AuGdsNavigationPanel";

oFF.AuGdsNavigationPanel.ROW_ICO_NAME = "rowIco";
oFF.AuGdsNavigationPanel.COL_ICO_NAME = "colIco";
oFF.AuGdsNavigationPanel.createNavPanel = function(genesis)
{
	var obj = new oFF.AuGdsNavigationPanel();
	obj.setupExt(genesis);
	return obj;
};
oFF.AuGdsNavigationPanel.prototype.m_genesis = null;
oFF.AuGdsNavigationPanel.prototype.m_queryManager = null;
oFF.AuGdsNavigationPanel.prototype.m_root = null;
oFF.AuGdsNavigationPanel.prototype.m_rowList = null;
oFF.AuGdsNavigationPanel.prototype.m_colList = null;
oFF.AuGdsNavigationPanel.prototype.m_freeList = null;
oFF.AuGdsNavigationPanel.prototype.m_ignoreEvent = false;
oFF.AuGdsNavigationPanel.prototype.m_editActionListeners = null;
oFF.AuGdsNavigationPanel.prototype.setupExt = function(genesis)
{
	this.m_genesis = genesis;
	this.m_editActionListeners = oFF.XList.create();
	this.m_root = this.m_genesis.newControl(oFF.UiType.FLEX_LAYOUT);
	this.m_root.setDirection(oFF.UiFlexDirection.COLUMN);
	this.m_root.useMaxSpace();
	this.m_rowList = this.createListWithTitle("Row Characteristics");
	this.m_root.addItem(this.m_rowList);
	this.m_colList = this.createListWithTitle("Column Characteristics");
	this.m_root.addItem(this.m_colList);
	this.m_freeList = this.createListWithTitle("Free Characteristics");
	this.m_root.addItem(this.m_freeList);
};
oFF.AuGdsNavigationPanel.prototype.releaseObject = function()
{
	this.m_editActionListeners.clear();
	this.m_editActionListeners = oFF.XObjectExt.release(this.m_editActionListeners);
	this.m_queryManager = null;
	this.m_genesis = null;
	this.m_rowList = null;
	this.m_colList = null;
	this.m_freeList = null;
	this.m_root = oFF.XObjectExt.release(this.m_root);
	oFF.XObjectExt.prototype.releaseObject.call( this );
};
oFF.AuGdsNavigationPanel.prototype.addEditActionListener = function(editActionListener)
{
	this.m_editActionListeners.add(editActionListener);
};
oFF.AuGdsNavigationPanel.prototype.removeEditActionListener = function(editActionListener)
{
	this.m_editActionListeners.removeElement(editActionListener);
};
oFF.AuGdsNavigationPanel.prototype.getQueryManager = function()
{
	return this.m_queryManager;
};
oFF.AuGdsNavigationPanel.prototype.getView = function()
{
	return this.m_root;
};
oFF.AuGdsNavigationPanel.prototype.getGenesis = function()
{
	return this.m_genesis;
};
oFF.AuGdsNavigationPanel.prototype.setQueryManager = function(manager)
{
	this.unregister();
	this.m_queryManager = manager;
	this.register();
	this.updateNavPanel();
};
oFF.AuGdsNavigationPanel.prototype.register = function()
{
	if (oFF.notNull(this.m_queryManager))
	{
		var queryModel = this.m_queryManager.getQueryModel();
		queryModel.getRowsAxis().registerChangedListener(this, null);
		queryModel.getColumnsAxis().registerChangedListener(this, null);
		queryModel.getFreeAxis().registerChangedListener(this, null);
	}
};
oFF.AuGdsNavigationPanel.prototype.unregister = function()
{
	if (oFF.notNull(this.m_queryManager))
	{
		var queryModel = this.m_queryManager.getQueryModel();
		queryModel.getRowsAxis().unregisterChangedListener(this);
		queryModel.getColumnsAxis().unregisterChangedListener(this);
		queryModel.getFreeAxis().unregisterChangedListener(this);
	}
};
oFF.AuGdsNavigationPanel.prototype.updateNavPanel = function()
{
	this.m_rowList.clearItems();
	this.m_colList.clearItems();
	this.m_freeList.clearItems();
	if (oFF.isNull(this.m_queryManager))
	{
		return;
	}
	var dimensions = this.m_queryManager.getDimensionAccessor().getDimensions();
	for (var i = 0; i < dimensions.size(); i++)
	{
		var dimension = dimensions.get(i);
		var axisType = dimension.getAxisType();
		if (axisType !== oFF.AxisType.ROWS && axisType !== oFF.AxisType.COLUMNS && axisType !== oFF.AxisType.FREE)
		{
			continue;
		}
		this.addListItem(dimension);
	}
};
oFF.AuGdsNavigationPanel.prototype.createListWithTitle = function(title)
{
	var list = this.m_genesis.newControl(oFF.UiType.LIST);
	list.setSelectionMode(oFF.UiSelectionMode.NONE);
	list.setFlex("1 1 33%");
	list.setNewHeader(oFF.UiType.LABEL).setText(title).setFontWeight(oFF.UiFontWeight.BOLD);
	list.registerOnDrop(this);
	return list;
};
oFF.AuGdsNavigationPanel.prototype.addListItem = function(dimension)
{
	var item = this.m_genesis.newControl(oFF.UiType.CUSTOM_LIST_ITEM);
	item.setDraggable(true);
	item.setCustomObject(dimension);
	var layout = item.setNewContent(oFF.UiType.FLEX_LAYOUT);
	layout.setJustifyContent(oFF.UiFlexJustifyContent.SPACE_BETWEEN);
	layout.setAlignContent(oFF.UiFlexAlignContent.CENTER);
	layout.setHeightCss("32px");
	layout.setPaddingCss("5px");
	var displayText = oFF.XStringUtils.isNotNullAndNotEmpty(dimension.getText()) ? dimension.getText() : dimension.getName();
	var nameLbl = layout.addNewItemOfType(oFF.UiType.LABEL);
	nameLbl.setText(displayText);
	nameLbl.setFlex("1 0 50%");
	var rowIcon = layout.addNewItemOfType(oFF.UiType.ICON);
	rowIcon.setName(oFF.AuGdsNavigationPanel.ROW_ICO_NAME);
	rowIcon.setHeightCss("16px");
	rowIcon.setFlex("0 0 16px");
	rowIcon.registerOnPress(oFF.PressListenerLambda.create( function(){
		this.m_ignoreEvent = true;
		if (dimension.getAxisType() === oFF.AxisType.ROWS)
		{
			this.m_queryManager.getQueryModel().getFreeAxis().add(dimension);
		}
		else
		{
			this.m_queryManager.getQueryModel().getRowsAxis().add(dimension);
		}
		this.moveItemToList(dimension, item);
		this.m_ignoreEvent = false;
		this.notifyEditActionListeners();
	}.bind(this)));
	layout.addNewItemOfType(oFF.UiType.SPACER).setWidthCss("16px");
	var colIcon = layout.addNewItemOfType(oFF.UiType.ICON);
	colIcon.setName(oFF.AuGdsNavigationPanel.COL_ICO_NAME);
	colIcon.setHeightCss("16px");
	colIcon.setFlex("0 0 16px");
	colIcon.registerOnPress(oFF.PressListenerLambda.create( function(){
		this.m_ignoreEvent = true;
		if (dimension.getAxisType() === oFF.AxisType.COLUMNS)
		{
			this.m_queryManager.getQueryModel().getFreeAxis().add(dimension);
		}
		else
		{
			this.m_queryManager.getQueryModel().getColumnsAxis().add(dimension);
		}
		this.moveItemToList(dimension, item);
		this.m_ignoreEvent = false;
		this.notifyEditActionListeners();
	}.bind(this)));
	this.moveItemToList(dimension, item);
};
oFF.AuGdsNavigationPanel.prototype.notifyEditActionListeners = function()
{
	for (var i = 0; i < this.m_editActionListeners.size(); i++)
	{
		this.m_editActionListeners.get(i).notifyEditAction();
	}
};
oFF.AuGdsNavigationPanel.prototype.moveItemToList = function(dimension, item)
{
	var axisType = dimension.getAxisType();
	var content = item.getContent();
	var rowIco = content.getItemByName(oFF.AuGdsNavigationPanel.ROW_ICO_NAME);
	var colIco = content.getItemByName(oFF.AuGdsNavigationPanel.COL_ICO_NAME);
	if (axisType === oFF.AxisType.ROWS)
	{
		this.m_rowList.addItem(item);
		rowIco.setIcon("table-view");
		rowIco.setFontColor(oFF.UiColor.ORANGE.newDarkerColor(0.2));
		rowIco.setTooltip("Move to free axis");
		colIco.setIcon("table-column");
		colIco.setFontColor(oFF.UiColor.BLUE.newDarkerColor(0.2));
		colIco.setTooltip("Move to column axis");
	}
	else if (axisType === oFF.AxisType.COLUMNS)
	{
		this.m_colList.addItem(item);
		rowIco.setIcon("table-row");
		rowIco.setFontColor(oFF.UiColor.BLUE.newDarkerColor(0.2));
		rowIco.setTooltip("Move to row axis");
		colIco.setIcon("table-view");
		colIco.setFontColor(oFF.UiColor.ORANGE.newDarkerColor(0.2));
		colIco.setTooltip("Move to free axis");
	}
	else if (axisType === oFF.AxisType.FREE)
	{
		this.m_freeList.addItem(item);
		rowIco.setIcon("table-row");
		rowIco.setFontColor(oFF.UiColor.BLUE.newDarkerColor(0.2));
		rowIco.setTooltip("Move to row axis");
		colIco.setIcon("table-column");
		colIco.setFontColor(oFF.UiColor.BLUE.newDarkerColor(0.2));
		colIco.setTooltip("Move to column axis");
	}
};
oFF.AuGdsNavigationPanel.prototype.onModelComponentChanged = function(modelComponent, customIdentifier)
{
	if (this.m_ignoreEvent)
	{
		return;
	}
	this.updateNavPanel();
};
oFF.AuGdsNavigationPanel.prototype.clearEditActionListeners = function()
{
	this.m_editActionListeners.clear();
};
oFF.AuGdsNavigationPanel.prototype.onDrop = function(event)
{
	var destinationList = event.getDroppedControl();
	var draggedItem = event.getDraggedControl();
	if (oFF.notNull(destinationList) && oFF.notNull(draggedItem) && draggedItem.getCustomObject() !== null)
	{
		var dimension = draggedItem.getCustomObject();
		this.m_ignoreEvent = true;
		var didChange = false;
		if (destinationList === this.m_rowList && dimension.getAxisType() !== oFF.AxisType.ROWS)
		{
			this.m_queryManager.getQueryModel().getRowsAxis().add(dimension);
			didChange = true;
		}
		else if (destinationList === this.m_colList && dimension.getAxisType() !== oFF.AxisType.COLUMNS)
		{
			this.m_queryManager.getQueryModel().getColumnsAxis().add(dimension);
			didChange = true;
		}
		else if (destinationList === this.m_freeList && dimension.getAxisType() !== oFF.AxisType.FREE)
		{
			this.m_queryManager.getQueryModel().getFreeAxis().add(dimension);
			didChange = true;
		}
		if (didChange)
		{
			this.moveItemToList(dimension, draggedItem);
			this.m_ignoreEvent = false;
			this.notifyEditActionListeners();
		}
		else
		{
			this.m_ignoreEvent = false;
		}
	}
};

oFF.AuProteusEngine = function() {};
oFF.AuProteusEngine.prototype = new oFF.XObjectExt();
oFF.AuProteusEngine.prototype._ff_c = "AuProteusEngine";

oFF.AuProteusEngine.HTML_TEMPLATE = "<!DOCTYPE html>\r\n<html>\r\n   <head>\r\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"/>\r\n      <meta charset=\"UTF-8\">\r\n      <title>Proteus output</title>\r\n      <script\r\n         id=\"sap-ui-bootstrap\"\r\n         src=\"https://sapui5.hana.ondemand.com/resources/sap-ui-core.js\"\r\n         data-sap-ui-theme=\"sap_bluecrystal\"\r\n         data-sap-ui-libs=\"sap.m\"\r\n         data-sap-ui-compatVersion=\"edge\"\r\n         data-sap-ui-preload=\"async\"\r\n         data-sap-ui-resourceroots='{\r\n            \"sap.ui.demo.wt\": \"./\"\r\n         }' >\r\n      </script>\r\n      <script>\r\n         sap.ui.getCore().attachInit(function () {\r\n            sap.ui.xmlview({\r\n               viewName : \"sap.ui.demo.wt.views.Main\"\r\n            }).placeAt(\"content\");\r\n         });\r\n      </script>\r\n   </head>\r\n   <body class=\"sapUiBody\" id=\"content\">\r\n   </body>\r\n</html>\r\n";
oFF.AuProteusEngine.createEngine = function(quasarDocContent)
{
	var newEngine = new oFF.AuProteusEngine();
	newEngine.setupEngine(quasarDocContent);
	return newEngine;
};
oFF.AuProteusEngine.prototype.m_quasarJsonContent = null;
oFF.AuProteusEngine.prototype.m_parsingErrors = null;
oFF.AuProteusEngine.prototype.m_xmlViewContent = null;
oFF.AuProteusEngine.prototype.m_parsingDepth = 0;
oFF.AuProteusEngine.prototype.releaseObject = function()
{
	this.m_quasarJsonContent = null;
	this.m_xmlViewContent = null;
	this.m_parsingErrors = oFF.XObjectExt.release(this.m_parsingErrors);
	oFF.XObjectExt.prototype.releaseObject.call( this );
};
oFF.AuProteusEngine.prototype.getLogSeverity = function()
{
	return oFF.Severity.PRINT;
};
oFF.AuProteusEngine.prototype.convert = function()
{
	this.m_xmlViewContent = this.parseDocument();
};
oFF.AuProteusEngine.prototype.getHtmlFileContent = function()
{
	return oFF.AuProteusEngine.HTML_TEMPLATE;
};
oFF.AuProteusEngine.prototype.getXmlViewContent = function()
{
	if (oFF.isNull(this.m_xmlViewContent))
	{
		this.m_xmlViewContent = this.parseDocument();
	}
	return this.m_xmlViewContent;
};
oFF.AuProteusEngine.prototype.setQuasarDocumentJson = function(quasarDocContent)
{
	this.m_quasarJsonContent = quasarDocContent;
};
oFF.AuProteusEngine.prototype.getParsingErrors = function()
{
	return this.m_parsingErrors;
};
oFF.AuProteusEngine.prototype.hasErrors = function()
{
	return this.m_parsingErrors.size() > 0;
};
oFF.AuProteusEngine.prototype.setupEngine = function(quasarDocContent)
{
	this.m_quasarJsonContent = quasarDocContent;
	this.m_parsingErrors = oFF.XListOfString.create();
};
oFF.AuProteusEngine.prototype.parseDocument = function()
{
	this.m_parsingErrors.clear();
	if (oFF.notNull(this.m_quasarJsonContent))
	{
		var strBuf = oFF.XStringBuffer.create();
		strBuf.appendLine("<mvc:View");
		strBuf.appendLine("\txmlns=\"sap.m\"");
		strBuf.appendLine("\txmlns:core=\"sap.ui.core\"");
		strBuf.appendLine("\txmlns:mvc=\"sap.ui.core.mvc\">");
		var contentElement = this.m_quasarJsonContent.getStructureByKey(oFF.UiConstants.QSA_CONTENT);
		if (oFF.isNull(contentElement))
		{
			contentElement = this.m_quasarJsonContent;
		}
		this.m_parsingDepth = 1;
		this.parseControl(contentElement, strBuf, null);
		strBuf.appendLine("</mvc:View>");
		return strBuf.toString();
	}
	else
	{
		this.addParsingError("Missing quasar json document!");
	}
	return null;
};
oFF.AuProteusEngine.prototype.parseControl = function(controlElement, strBuf, itemType)
{
	var controlNameStr = controlElement.getStringByKey(oFF.UiConstants.QSA_CTYPE);
	var uiType = oFF.UiType.lookupUiType(controlNameStr);
	if (oFF.isNull(uiType) && oFF.notNull(itemType))
	{
		uiType = itemType;
	}
	if (oFF.notNull(uiType))
	{
		var ui5PControlStr = this.getUi5NameForUiType(uiType);
		if (oFF.XStringUtils.isNotNullAndNotEmpty(ui5PControlStr))
		{
			var hasAggregations = false;
			var indents = oFF.XStringUtils.leftPad("", "\t", this.m_parsingDepth);
			strBuf.append(oFF.XStringUtils.concatenate2(indents, "<"));
			strBuf.append(ui5PControlStr);
			var keys = controlElement.getKeysAsReadOnlyListOfString();
			for (var i = 0; i < keys.size(); i++)
			{
				var key = keys.get(i);
				var tmpProp = oFF.UiProperty.lookup(key);
				var value = oFF.UiUtils.getElementAsString(controlElement, key);
				if (oFF.notNull(tmpProp) && tmpProp !== oFF.UiProperty.ID)
				{
					this.parseProperty(tmpProp, value, strBuf);
				}
				var tmpAgr = oFF.UiAggregation.lookup(key);
				if (oFF.notNull(tmpAgr))
				{
					if (hasAggregations === false)
					{
						this.m_parsingDepth++;
						hasAggregations = true;
						strBuf.appendLine(">");
					}
					var aggregationItems = controlElement.getListByKey(key);
					if (oFF.notNull(aggregationItems) && aggregationItems.size() > 0)
					{
						for (var m = 0; m < aggregationItems.size(); m++)
						{
							var docAgrItem = aggregationItems.getStructureAt(m);
							this.parseControl(docAgrItem, strBuf, uiType.getDefaultItemType());
						}
						this.m_parsingDepth--;
					}
				}
			}
			if (hasAggregations)
			{
				strBuf.append(oFF.XStringUtils.concatenate2(indents, "<"));
				strBuf.append("/");
				strBuf.append(ui5PControlStr);
				strBuf.appendLine(">");
			}
			else
			{
				strBuf.appendLine("/>");
			}
		}
		else
		{
			this.addParsingError(oFF.XStringUtils.concatenate2("Cannot parse control: ", controlNameStr));
		}
	}
	else
	{
		this.addParsingError(oFF.XStringUtils.concatenate2("Cannot find control: ", controlNameStr));
	}
};
oFF.AuProteusEngine.prototype.parseProperty = function(uiProp, value, strBuf)
{
	var ui5PropStr = this.getUi5PropertyForUiProperty(uiProp);
	var propValue = value;
	if (oFF.XStringUtils.isNotNullAndNotEmpty(ui5PropStr))
	{
		if (uiProp === oFF.UiProperty.ICON && oFF.XString.startsWith(value, "http") === false)
		{
			propValue = oFF.XStringUtils.concatenate2("sap-icon://", propValue);
		}
		strBuf.append(" ");
		strBuf.append(ui5PropStr);
		strBuf.append("=\"");
		strBuf.append(propValue);
		strBuf.append("\"");
	}
	else
	{
		this.addParsingError(oFF.XStringUtils.concatenate2("Cannot parse property: ", uiProp.getName()));
	}
};
oFF.AuProteusEngine.prototype.getUi5NameForUiType = function(uiType)
{
	if (uiType === oFF.UiType.LABEL)
	{
		return "Label";
	}
	else if (uiType === oFF.UiType.BUTTON)
	{
		return "Button";
	}
	else if (uiType === oFF.UiType.TEXT)
	{
		return "Text";
	}
	else if (uiType === oFF.UiType.INPUT)
	{
		return "Input";
	}
	else if (uiType === oFF.UiType.DROPDOWN)
	{
		return "ActionSelect";
	}
	else if (uiType === oFF.UiType.DROPDOWN_ITEM)
	{
		return "core:ListItem";
	}
	else if (uiType === oFF.UiType.FLEX_LAYOUT)
	{
		return "FlexBox";
	}
	return null;
};
oFF.AuProteusEngine.prototype.getUi5PropertyForUiProperty = function(uiProp)
{
	if (uiProp === oFF.UiProperty.NAME)
	{
		return "id";
	}
	else if (uiProp === oFF.UiProperty.TEXT)
	{
		return "text";
	}
	else if (uiProp === oFF.UiProperty.ICON)
	{
		return "icon";
	}
	else if (uiProp === oFF.UiProperty.PLACEHOLDER)
	{
		return "placeholder";
	}
	else if (uiProp === oFF.UiProperty.WIDTH)
	{
		return "width";
	}
	else if (uiProp === oFF.UiProperty.HEIGHT)
	{
		return "height";
	}
	else if (uiProp === oFF.UiProperty.DIRECTION)
	{
		return "direction";
	}
	return null;
};
oFF.AuProteusEngine.prototype.addParsingError = function(parsingError)
{
	this.m_parsingErrors.add(parsingError);
};

oFF.AuProteusShell = function() {};
oFF.AuProteusShell.prototype = new oFF.DfProgram();
oFF.AuProteusShell.prototype._ff_c = "AuProteusShell";

oFF.AuProteusShell.DEFAULT_PROGRAM_NAME = "Proteus";
oFF.AuProteusShell.OUTPUT_DIR = "output";
oFF.AuProteusShell.prototype.m_proteusEngine = null;
oFF.AuProteusShell.prototype.m_quasarJsonDocument = null;
oFF.AuProteusShell.prototype.m_inputFile = null;
oFF.AuProteusShell.prototype.m_outputDir = null;
oFF.AuProteusShell.prototype.newProgram = function()
{
	var newPrg = new oFF.AuProteusShell();
	newPrg.setup();
	return newPrg;
};
oFF.AuProteusShell.prototype.doSetupProgramMetadata = function(metadata)
{
	oFF.DfProgram.prototype.doSetupProgramMetadata.call( this , metadata);
	metadata.addOption(oFF.DfProgram.PARAM_FILE, "Specify the quasar file", "Path to the file", oFF.XValueType.STRING);
	metadata.addOption(oFF.AuProteusShell.OUTPUT_DIR, "Specify the output directory", "The path to the output directory", oFF.XValueType.STRING);
};
oFF.AuProteusShell.prototype.evalArguments = function()
{
	oFF.DfProgram.prototype.evalArguments.call( this );
	var session = this.getSession();
	var argStruct = this.getArgumentStructure();
	var inputFile = argStruct.getStringByKey(oFF.DfProgram.PARAM_FILE);
	if (oFF.XStringUtils.isNotNullAndNotEmpty(inputFile) === true)
	{
		this.m_inputFile = oFF.XFile.createExt(session, inputFile, oFF.PathFormat.AUTO_DETECT, oFF.VarResolveMode.DOLLAR);
	}
	var outputDir = argStruct.getStringByKey(oFF.TeAthena.PARAM_TYPE);
	if (oFF.XStringUtils.isNotNullAndNotEmpty(outputDir) === true)
	{
		this.m_outputDir = oFF.XFile.createExt(session, outputDir, oFF.PathFormat.AUTO_DETECT, oFF.VarResolveMode.DOLLAR);
	}
	if (oFF.isNull(this.m_outputDir))
	{
		this.m_outputDir = oFF.XFile.createExt(session, "${ff_tmp}/proteus/", oFF.PathFormat.AUTO_DETECT, oFF.VarResolveMode.DOLLAR);
	}
};
oFF.AuProteusShell.prototype.releaseObject = function()
{
	this.m_quasarJsonDocument = null;
	this.m_inputFile = oFF.XObjectExt.release(this.m_inputFile);
	this.m_outputDir = oFF.XObjectExt.release(this.m_outputDir);
	this.m_proteusEngine = oFF.XObjectExt.release(this.m_proteusEngine);
	oFF.DfProgram.prototype.releaseObject.call( this );
};
oFF.AuProteusShell.prototype.runProcess = function()
{
	this.println("Proteus quasar -> ui5 converter tool");
	this.loadQuasarFile();
	this.exitNow(0);
	return false;
};
oFF.AuProteusShell.prototype.loadQuasarFile = function()
{
	if (oFF.isNull(this.m_inputFile))
	{
		var filePath = "${ff_sdk}/production/queries/proteus/simple_quasar.qsa";
		var session = this.getSession();
		this.m_inputFile = oFF.XFile.createExt(session, filePath, oFF.PathFormat.AUTO_DETECT, oFF.VarResolveMode.DOLLAR);
	}
	this.m_inputFile.processLoad(oFF.SyncType.NON_BLOCKING, this, null, oFF.CompressionType.NONE);
};
oFF.AuProteusShell.prototype.createEngineAndRun = function()
{
	if (oFF.notNull(this.m_quasarJsonDocument) && this.m_quasarJsonDocument.size() > 0)
	{
		this.println("Processing document!");
		this.m_proteusEngine = oFF.AuProteusEngine.createEngine(this.m_quasarJsonDocument);
		this.m_proteusEngine.convert();
	}
	else
	{
		this.println("Specified file is empty or not a quasar document");
	}
};
oFF.AuProteusShell.prototype.saveOutput = function()
{
	if (oFF.notNull(this.m_proteusEngine))
	{
		if (this.m_proteusEngine.hasErrors())
		{
			var errorsIterator = this.m_proteusEngine.getParsingErrors().getIterator();
			while (errorsIterator.hasNext())
			{
				this.println(errorsIterator.next());
			}
		}
		else
		{
			this.println("Quasar document successfully converted!");
		}
		this.println(oFF.XStringUtils.concatenate2("Saving output to: ", this.m_outputDir.getNativePath()));
		this.saveIndexHtmlTempalteToFile();
		this.saveViewFile(this.m_proteusEngine.getXmlViewContent());
		this.println("Successfully saved!");
	}
};
oFF.AuProteusShell.prototype.saveIndexHtmlTempalteToFile = function()
{
	if (oFF.isNull(this.m_outputDir))
	{
		this.println("Output directory cannot be found!");
	}
	else
	{
		if (this.m_outputDir.isExisting() === false)
		{
			this.m_outputDir.mkdirs();
		}
		var file = this.m_outputDir.newChild("index.html");
		if (oFF.isNull(file))
		{
			this.println("Cannot save!");
		}
		else
		{
			var fileContentToSave = oFF.XByteArray.convertFromString(this.m_proteusEngine.getHtmlFileContent());
			file.saveByteArray(fileContentToSave);
			this.println("HTML file saved!");
		}
	}
};
oFF.AuProteusShell.prototype.saveViewFile = function(viewStr)
{
	if (oFF.isNull(this.m_outputDir))
	{
		this.println("Output directory cannot be found!");
	}
	else
	{
		var viewDir = this.m_outputDir.newChild("views/");
		if (viewDir.isExisting() === false)
		{
			viewDir.mkdirs();
		}
		var viewfile = viewDir.newChild("Main.view.xml");
		if (oFF.isNull(viewfile))
		{
			this.println("Cannot save!");
		}
		else
		{
			var fileContentToSave = oFF.XByteArray.convertFromString(viewStr);
			viewfile.saveByteArray(fileContentToSave);
			this.println("View file saved!");
		}
	}
};
oFF.AuProteusShell.prototype.onFileLoaded = function(extResult, file, fileContent, customIdentifier)
{
	if (extResult.isValid())
	{
		if (oFF.notNull(fileContent))
		{
			var stringContent = fileContent.getString();
			if (oFF.XStringUtils.isNotNullAndNotEmpty(stringContent))
			{
				var parser = oFF.JsonParserFactory.newInstance();
				var jsonContent = parser.parse(stringContent);
				if (oFF.notNull(jsonContent))
				{
					if (parser.hasErrors())
					{
						this.print("Could not read document!");
					}
					else
					{
						oFF.XObjectExt.release(parser);
						if (jsonContent.isStructure())
						{
							this.println("File loaded!");
							this.m_quasarJsonDocument = jsonContent;
							this.createEngineAndRun();
							this.saveOutput();
						}
					}
				}
				else
				{
					this.println("Document is not a json!");
				}
			}
		}
	}
	else
	{
		this.println("Failed to laod file!");
	}
};

oFF.GyrosCommand = function() {};
oFF.GyrosCommand.prototype = new oFF.XConstant();
oFF.GyrosCommand.prototype._ff_c = "GyrosCommand";

oFF.GyrosCommand.s_commands = null;
oFF.GyrosCommand.SET_HIERARCHY_ON_COUNTRY_DIM = null;
oFF.GyrosCommand.FILTER_ON_AUSTRALIA = null;
oFF.GyrosCommand.FILTER_TYPE_ON_GERMANY = null;
oFF.GyrosCommand.DUPLICATE_AND_LINK_INTERSECT = null;
oFF.GyrosCommand.DUPLICATE_AND_LINK_UNION = null;
oFF.GyrosCommand.LINK_BICS_ATTRIBUTE_VARIABLES_INTERSECT = null;
oFF.GyrosCommand.LINK_BICS_ATTRIBUTE_VARIABLES_UNION = null;
oFF.GyrosCommand.LINK_NONSENSE = null;
oFF.GyrosCommand.LINK_CUSTOMER_ON_DIFFERENT_HIERARCHIES = null;
oFF.GyrosCommand.CLONE_QUERY_MANAGER = null;
oFF.GyrosCommand.SET_VARIABLES_VALUE_Q0005_MS = null;
oFF.GyrosCommand.ADD_MATCH_FILTER = null;
oFF.GyrosCommand.AUGMENT_CURRENCY_VARIABLE = null;
oFF.GyrosCommand.CLEAR_DYNAMIC_FILTER = null;
oFF.GyrosCommand.staticSetupGyrosCommands = function()
{
	oFF.GyrosCommand.s_commands = oFF.XListOfNameObject.create();
	oFF.GyrosCommand.SET_HIERARCHY_ON_COUNTRY_DIM = oFF.GyrosCommand.createCommand("SetHierarchyOnCountryDim", "Set hierarchy on dim 0BC_COUN");
	oFF.GyrosCommand.FILTER_ON_AUSTRALIA = oFF.GyrosCommand.createCommand("FilterOnAustralia", "Filter on country Australia");
	oFF.GyrosCommand.FILTER_TYPE_ON_GERMANY = oFF.GyrosCommand.createCommand("FilterTypeOnGermany", "Filter type on country Germany");
	oFF.GyrosCommand.DUPLICATE_AND_LINK_INTERSECT = oFF.GyrosCommand.createCommand("DuplicateAndLinkIntersect", "Duplicate and link intersect");
	oFF.GyrosCommand.DUPLICATE_AND_LINK_UNION = oFF.GyrosCommand.createCommand("DuplicateAndLinkUnion", "Duplicate and link union");
	oFF.GyrosCommand.LINK_BICS_ATTRIBUTE_VARIABLES_INTERSECT = oFF.GyrosCommand.createCommand("BicsAttributeVariablesIntersect", "Intersect link BICS_ATTRIBUTE_VARIABLES");
	oFF.GyrosCommand.LINK_BICS_ATTRIBUTE_VARIABLES_UNION = oFF.GyrosCommand.createCommand("BicsAttributeVariablesUnion", "Union link BICS_ATTRIBUTE_VARIABLES");
	oFF.GyrosCommand.LINK_NONSENSE = oFF.GyrosCommand.createCommand("NonsenseIntersect", "Intersect completely different variables");
	oFF.GyrosCommand.LINK_CUSTOMER_ON_DIFFERENT_HIERARCHIES = oFF.GyrosCommand.createCommand("LinkCustomerOnDifferentHierarchies", "Link customer variable with hierarchy 0BICS_HIER_CUST_TIME_DEP_2");
	oFF.GyrosCommand.CLONE_QUERY_MANAGER = oFF.GyrosCommand.createCommand("CloneQueryManager", "Clone the Gyros QueryManager");
	oFF.GyrosCommand.SET_VARIABLES_VALUE_Q0005_MS = oFF.GyrosCommand.createCommand("SetVariableValueQ0005MS", "Set variable values for query 0BICS_C03_BICSTEST_Q0005_MS");
	oFF.GyrosCommand.ADD_MATCH_FILTER = oFF.GyrosCommand.createCommand("AddMatchFilter", "Add match filter on variable 0BC_TYPE_SE");
	oFF.GyrosCommand.AUGMENT_CURRENCY_VARIABLE = oFF.GyrosCommand.createCommand("AugmentCurrencyVariable", "Add a currency variable");
	oFF.GyrosCommand.CLEAR_DYNAMIC_FILTER = oFF.GyrosCommand.createCommand("ClearDynamicFilter", "Clear dynamic filter");
};
oFF.GyrosCommand.createCommand = function(name, description)
{
	var cmd = new oFF.GyrosCommand();
	cmd._setupInternal(name);
	cmd.m_description = description;
	oFF.GyrosCommand.s_commands.add(cmd);
	return cmd;
};
oFF.GyrosCommand.getAllCommands = function()
{
	return oFF.GyrosCommand.s_commands;
};
oFF.GyrosCommand.getByName = function(name)
{
	return oFF.GyrosCommand.s_commands.getByKey(name);
};
oFF.GyrosCommand.prototype.m_description = null;
oFF.GyrosCommand.prototype.execute = function(gyros)
{
	var queryManager = gyros.getQueryManager();
	if (oFF.notNull(queryManager))
	{
		var queryModel = queryManager.getQueryModel();
		var name = this.getName();
		if (oFF.XString.isEqual(name, oFF.GyrosCommand.SET_HIERARCHY_ON_COUNTRY_DIM.getName()))
		{
			queryModel.getConvenienceCommands().setDimensionHierarchy("0BC_COUN", "0BICS_COUN_DEEP_4", true, 0);
			if (!queryModel.getDimensionByName("0BC_COUN").isHierarchyActive())
			{
				throw oFF.XException.createIllegalStateException("Hierarchy could not be set.");
			}
		}
		else if (oFF.XString.isEqual(name, oFF.GyrosCommand.FILTER_ON_AUSTRALIA.getName()))
		{
			queryModel.getConvenienceCommands().addSingleMemberFilterByDimensionName("0BC_COUN", "AUS", oFF.ComparisonOperator.EQUAL);
		}
		else if (oFF.XString.isEqual(name, oFF.GyrosCommand.FILTER_TYPE_ON_GERMANY.getName()))
		{
			queryModel.getConvenienceCommands().addSingleMemberFilterByDimensionName("0BC_TYPE", "0HIER_NODE!DE", oFF.ComparisonOperator.EQUAL);
		}
		else if (oFF.XString.isEqual(name, oFF.GyrosCommand.DUPLICATE_AND_LINK_INTERSECT.getName()) || oFF.XString.isEqual(name, oFF.GyrosCommand.DUPLICATE_AND_LINK_UNION.getName()))
		{
			var isIntersect = oFF.XString.isEqual(name, oFF.GyrosCommand.DUPLICATE_AND_LINK_INTERSECT.getName());
			gyros.setLinkage(this.createDuplicateLinkage(gyros, isIntersect ? oFF.OrcaLinkVarJoinMode.INTERSECT : oFF.OrcaLinkVarJoinMode.UNION));
		}
		else if (oFF.XString.isEqual(name, oFF.GyrosCommand.LINK_BICS_ATTRIBUTE_VARIABLES_INTERSECT.getName()) || oFF.XString.isEqual(name, oFF.GyrosCommand.LINK_BICS_ATTRIBUTE_VARIABLES_UNION.getName()))
		{
			var isIntersect1 = oFF.XString.isEqual(name, oFF.GyrosCommand.LINK_BICS_ATTRIBUTE_VARIABLES_INTERSECT.getName());
			gyros.setLinkage(this.createBicsAttributeVariablesLinkage(gyros, isIntersect1 ? oFF.OrcaLinkVarJoinMode.INTERSECT : oFF.OrcaLinkVarJoinMode.UNION));
		}
		else if (oFF.XString.isEqual(name, oFF.GyrosCommand.LINK_NONSENSE.getName()))
		{
			gyros.setLinkage(this.createNonsenseLink(gyros, oFF.OrcaLinkVarJoinMode.INTERSECT));
		}
		else if (oFF.XString.isEqual(name, oFF.GyrosCommand.LINK_CUSTOMER_ON_DIFFERENT_HIERARCHIES.getName()))
		{
			gyros.setLinkage(this.createDifferentHierarchyLinkage(gyros));
		}
		else if (oFF.XString.isEqual(name, oFF.GyrosCommand.CLONE_QUERY_MANAGER.getName()))
		{
			gyros.getQueryManager().cloneQueryManager();
		}
		else if (oFF.XString.isEqual(name, oFF.GyrosCommand.SET_VARIABLES_VALUE_Q0005_MS.getName()))
		{
			var variableProcessor = gyros.getQueryManager().getVariableProcessor();
			var varCountry = variableProcessor.getVariable("0BC_COUN_WERTEBEREICH");
			varCountry.setValueByString("DE");
		}
		else if (oFF.XString.isEqual(name, oFF.GyrosCommand.ADD_MATCH_FILTER.getName()))
		{
			this.addMatchFilter(queryModel);
		}
		else if (oFF.XString.isEqual(name, oFF.GyrosCommand.AUGMENT_CURRENCY_VARIABLE.getName()))
		{
			var path = "${ff_sdk}/production/queries/test/olap/fusion/TestOlapFusionCustomVariableCurrencyConversion/minimalAugment.json";
			var file = oFF.XFile.createExt(queryManager.getSession(), path, oFF.PathFormat.AUTO_DETECT, oFF.VarResolveMode.DOLLAR);
			if (oFF.isNull(file) || !file.isExisting())
			{
				throw oFF.XException.createIllegalStateException("File for augment not found.");
			}
			var syncAction = file.processLoad(oFF.SyncType.BLOCKING, null, null, oFF.CompressionType.NONE);
			if (syncAction.hasErrors() || file.getFileContent().getString() === null)
			{
				throw oFF.XException.createIllegalStateException("File for augment could not be loaded.");
			}
			var jsonModel = file.getFileContent().getJsonContent();
			var modellerResponse = oFF.XContent.createJsonObjectContent(oFF.QModelFormat.SFX, jsonModel);
			var docConverter = oFF.DocConverterFactory.createDocConverter(oFF.QModelFormat.SFX, oFF.QModelFormat.INA_REPOSITORY);
			var extConverterResult = docConverter.convert(queryManager.getApplication(), modellerResponse, oFF.QModelFormat.INA_REPOSITORY);
			var inaRepoData = extConverterResult.getData();
			queryManager.getQueryModel().deserializeExt(oFF.QModelFormat.INA_REPOSITORY, inaRepoData.toString());
		}
		else if (oFF.XString.isEqual(name, oFF.GyrosCommand.CLEAR_DYNAMIC_FILTER.getName()))
		{
			queryModel.getConvenienceCommands().clearFilters();
		}
	}
};
oFF.GyrosCommand.prototype.addMatchFilter = function(queryModel)
{
	var variable = queryModel.getVariable("0BC_TYPE_SE");
	var dimension = variable.getDimension();
	var memberFilter = variable.getMemberFilter();
	memberFilter.addSupplementField(dimension.getDisplayKeyField());
	memberFilter.addSupplementField(dimension.getTextField());
	var filter = memberFilter.addNewCartesianElement();
	filter.setComparisonOperator(oFF.ComparisonOperator.MATCH);
	filter.setField(dimension.getKeyField());
	var low = filter.getLow();
	low.setString("C");
	low.addSupplementValue(dimension.getDisplayKeyField().getName(), "C");
	low.addSupplementValue(dimension.getTextField().getName(), "NSW Soft");
};
oFF.GyrosCommand.prototype.createBicsAttributeVariablesLinkage = function(gyros, mode)
{
	var result = oFF.XHashMapByString.create();
	var queryManager = gyros.getQueryManager();
	var application = queryManager.getApplication();
	var dataSourceName = queryManager.getDataSource().getFullQualifiedName();
	if (!oFF.XString.isEqual(dataSourceName, "view:[_SYS_BIC][bics.variables][BICS_ATTRIBUTE_VARIABLES]"))
	{
		return result;
	}
	var systemName = queryManager.getSystemName();
	var serviceConfig = oFF.QueryServiceConfig.createWithDataSourceName(application, systemName, "view:[_SYS_BIC][bics.other][BICS_MEMBERS_WITH_EMPTY_AND_NULL_KEYS]");
	var syncAction = serviceConfig.processQueryManagerCreation(oFF.SyncType.BLOCKING, null, null);
	if (syncAction.hasErrors())
	{
		return result;
	}
	var linkQueryManager = syncAction.getData();
	var linkVar = linkQueryManager.getVariable("INT_ID_VAR");
	var mainVar1 = queryManager.getVariable("CUSTOMER_M_S");
	result.put(mainVar1.getName(), oFF.XPair.create(mode, oFF.XCollectionUtils.singletonList(linkVar)));
	var mainVar2 = queryManager.getVariable("PRODUCT_M_I");
	result.put(mainVar2.getName(), oFF.XPair.create(mode, oFF.XCollectionUtils.singletonList(linkVar)));
	return result;
};
oFF.GyrosCommand.prototype.createDuplicateLinkage = function(gyros, mode)
{
	var result = oFF.XHashMapByString.create();
	var mainQueryManager = gyros.getQueryManager();
	var systemName = mainQueryManager.getSystemName();
	var dataSource = mainQueryManager.getDataSource();
	var serviceConfig = oFF.QueryServiceConfig.createWithDataSourceName(gyros.getApplication(), systemName, dataSource.getFullQualifiedName());
	var syncAction = serviceConfig.processQueryManagerCreation(oFF.SyncType.BLOCKING, null, null);
	if (syncAction.hasErrors())
	{
		return result;
	}
	var linkQueryManager = syncAction.getData();
	var variables = mainQueryManager.getInputEnabledAndNonTechnicalVariables();
	for (var i = 0; i < variables.size(); i++)
	{
		var mainVariable = variables.get(i);
		var varName = mainVariable.getName();
		var linkedVariable = linkQueryManager.getVariable(varName);
		result.put(varName, oFF.XPair.create(mode, oFF.XCollectionUtils.singletonList(linkedVariable)));
	}
	return result;
};
oFF.GyrosCommand.prototype.createDifferentHierarchyLinkage = function(gyros)
{
	var result = oFF.XHashMapByString.create();
	var mainQueryManager = gyros.getQueryManager();
	var systemName = mainQueryManager.getSystemName();
	var dataSource = mainQueryManager.getDataSource();
	var serviceConfig = oFF.QueryServiceConfig.createWithDataSourceName(gyros.getApplication(), systemName, dataSource.getFullQualifiedName());
	var syncAction = serviceConfig.processQueryManagerCreation(oFF.SyncType.BLOCKING, null, null);
	if (syncAction.hasErrors())
	{
		return result;
	}
	var linkQueryManager = syncAction.getData();
	linkQueryManager.getVariable("0BC_CUST_HIERARCHY_INPUT").setValueByString("0BICS_HIER_CUST_TIME_DEP_2");
	result.put("0BC_CUST_NODE", oFF.XPair.create(oFF.OrcaLinkVarJoinMode.INTERSECT, oFF.XCollectionUtils.singletonList(linkQueryManager.getVariable("0BC_CUST_NODE"))));
	return result;
};
oFF.GyrosCommand.prototype.createNonsenseLink = function(gyros, mode)
{
	var result = oFF.XHashMapByString.create();
	var mainQueryManager = gyros.getQueryManager();
	if (!oFF.XString.isEqual(mainQueryManager.getDataSource().getFullQualifiedName(), "query:[][][0BOC_TEST_VARIABLE_TYPES_1]"))
	{
		return result;
	}
	var systemName = mainQueryManager.getSystemName();
	var serviceConfig = oFF.QueryServiceConfig.createWithDataSourceName(gyros.getApplication(), systemName, "query:[0BOC_TEST_VARIABLE_TYPES_2]");
	var syncAction = serviceConfig.processQueryManagerCreation(oFF.SyncType.BLOCKING, null, null);
	if (syncAction.hasErrors())
	{
		return result;
	}
	var mainVariable = mainQueryManager.getVariable("0BICS_PCOUN");
	var linkedVariable = syncAction.getData().getVariable("0BC_CUST_HIERARCHY_INPUT");
	result.put(mainVariable.getName(), oFF.XPair.create(mode, oFF.XCollectionUtils.singletonList(linkedVariable)));
	return result;
};
oFF.GyrosCommand.prototype.getDescription = function()
{
	return this.m_description;
};

oFF.AnalyticCardsProgram = function() {};
oFF.AnalyticCardsProgram.prototype = new oFF.DfApplicationProgram();
oFF.AnalyticCardsProgram.prototype._ff_c = "AnalyticCardsProgram";

oFF.AnalyticCardsProgram.DEFAULT_PROGRAM_NAME = "AnalyticCards";
oFF.AnalyticCardsProgram.SYSTEM_NAME = "system";
oFF.AnalyticCardsProgram.STORY_ID = "story";
oFF.AnalyticCardsProgram.CHART_WIDTH = "width";
oFF.AnalyticCardsProgram.CHART_HEIGHT = "height";
oFF.AnalyticCardsProgram.main = function()
{
	oFF.ApplicationUiModule.getInstance();
	var anaCard = oFF.KernelBoot.createByName(oFF.AnalyticCardsProgram.DEFAULT_PROGRAM_NAME);
	anaCard.setArgument("story", "87FE2F7A2943E2C3804B171509035B7");
	anaCard.setArgument("system", "starkiller");
	anaCard.setDefaultSyncType(oFF.SyncType.BLOCKING);
	anaCard.runFull();
};
oFF.AnalyticCardsProgram.prototype.m_systemName = null;
oFF.AnalyticCardsProgram.prototype.m_storyId = null;
oFF.AnalyticCardsProgram.prototype.m_chartHeight = 0;
oFF.AnalyticCardsProgram.prototype.m_chartWidth = 0;
oFF.AnalyticCardsProgram.prototype.m_orcaService = null;
oFF.AnalyticCardsProgram.prototype.newProgram = function()
{
	var newPrg = new oFF.AnalyticCardsProgram();
	newPrg.setup();
	return newPrg;
};
oFF.AnalyticCardsProgram.prototype.doSetupProgramMetadata = function(metadata)
{
	oFF.DfApplicationProgram.prototype.doSetupProgramMetadata.call( this , metadata);
	metadata.addOption(oFF.AnalyticCardsProgram.SYSTEM_NAME, "The system name", "", oFF.XValueType.STRING);
	metadata.addOption(oFF.AnalyticCardsProgram.STORY_ID, "The story id name", "", oFF.XValueType.STRING);
	metadata.addOption(oFF.AnalyticCardsProgram.CHART_HEIGHT, "The chart height in px", "", oFF.XValueType.STRING);
	metadata.addOption(oFF.AnalyticCardsProgram.CHART_WIDTH, "The chart width in px", "", oFF.XValueType.STRING);
};
oFF.AnalyticCardsProgram.prototype.runProcess = function()
{
	var initArguments = this.getArgumentStructure();
	if (oFF.notNull(initArguments))
	{
		this.m_systemName = initArguments.getStringByKey(oFF.AnalyticCardsProgram.SYSTEM_NAME);
		this.m_storyId = initArguments.getStringByKey(oFF.AnalyticCardsProgram.STORY_ID);
		this.m_chartHeight = oFF.XInteger.convertFromString(initArguments.getStringByKeyExt(oFF.AnalyticCardsProgram.CHART_HEIGHT, "0"));
		this.m_chartWidth = oFF.XInteger.convertFromString(initArguments.getStringByKeyExt(oFF.AnalyticCardsProgram.CHART_WIDTH, "0"));
		var systemLandscape = this.getApplication().getSystemLandscape();
		if (oFF.XStringUtils.containsString(this.m_systemName, "http://", true) || oFF.XStringUtils.containsString(this.m_systemName, "https://", true))
		{
			var sysUri = oFF.XUri.createFromUrl(this.m_systemName);
			this.m_systemName = oFF.OcOrcaServiceConfig.ORCA_MASTER_SYSTEM_NAME;
			systemLandscape.setSystemByUri(this.m_systemName, sysUri, null);
		}
		else
		{
			systemLandscape.setMasterSystemName(this.m_systemName);
		}
		var config = oFF.OcOrcaServiceConfig.create(this.getApplication(), this.m_systemName);
		var orcaAction = config.processOrcaServiceCreation(oFF.SyncType.BLOCKING, null, null);
		this.log(orcaAction.getSummary());
		if (orcaAction.isValid())
		{
			this.m_orcaService = orcaAction.getData();
			if (oFF.notNull(this.m_orcaService))
			{
				var landscapeLoadAction = this.m_orcaService.processSystemLandscapeLoad(oFF.SyncType.BLOCKING, null, null);
				this.log(landscapeLoadAction.getSummary());
				var systems = landscapeLoadAction.getData();
				for (var i = 0; i < systems.size(); i++)
				{
					var systemDescription = systems.get(i);
					systemLandscape.setSystemByDescription(systemDescription);
				}
				var storyAction = this.m_orcaService.processStoryLoad(null, null, null, this.m_storyId);
				this.log(storyAction.getSummary());
				var story = storyAction.getData();
				var quasarStory = oFF.OcQuasarStory.create(story);
				quasarStory.setQuasarMainLayoutType(oFF.OcLayoutType.CANVAS);
				var storyDef = quasarStory.getQuasarCompositeAnalyticalCardDocument();
				var quasarEngine = oFF.QuasarEngine.create(this.getApplication());
				quasarEngine.setDocument(storyDef);
				var uiManager = oFF.UiServerManager.create(this.getSession(), oFF.XPlatform.GENERIC);
				var process = this.getProcess();
				process.setEntity(oFF.ProcessEntity.GUI, uiManager);
				var selector = process.getSelector();
				selector.registerSelector(oFF.SigSelDomain.UI, uiManager.getSigSelProviderSelector());
				selector.registerSelector(oFF.SigSelDomain.DIALOG, uiManager.getSigSelProviderSelector());
				var genesis = oFF.UiGenesis.create(uiManager.getAnchor(), oFF.UiPosition.CONTENT, oFF.UiOperation.SET, 0, 0);
				quasarEngine.buildUi(genesis);
				var output = this.constructOutput(uiManager);
				var content = oFF.XContent.createContent();
				this.addDimensionsToChartJson(output, this.m_chartHeight, this.m_chartWidth);
				content.setJsonObject(output);
				this.getProgramContainer().setExitContent(content);
				this.println(output.toString());
			}
		}
		else
		{
			oFF.XLogger.println(orcaAction.getSummary());
		}
		return false;
	}
	return false;
};
oFF.AnalyticCardsProgram.prototype.addDimensionsToChartJson = function(output, height, width)
{
	if (oFF.notNull(output) && output.containsKey("chart"))
	{
		var chartStructure = output.getStructureByKey("chart");
		if (oFF.notNull(chartStructure))
		{
			var subChartStructure = chartStructure.getStructureByKey("chart");
			if (oFF.notNull(subChartStructure))
			{
				if (width > 0)
				{
					subChartStructure.putInteger("width", width);
				}
				if (height > 0)
				{
					subChartStructure.putInteger("height", height);
				}
			}
		}
	}
};
oFF.AnalyticCardsProgram.prototype.constructOutput = function(uiManager)
{
	var output = oFF.PrFactory.createStructure();
	var selector = uiManager.getSelector();
	var components = selector.selectComponentsByExpr("ui:.Chart", oFF.SigSelDomain.UI, null, 2);
	var uiItem;
	var modelJson;
	if (oFF.notNull(components) && components.size() > 0)
	{
		uiItem = components.get(0);
		modelJson = uiItem.getModelJson();
		output.put("chart", modelJson);
	}
	components = selector.selectComponentsByExpr("ui:.Card", oFF.SigSelDomain.UI, null, 2);
	if (oFF.notNull(components) && components.size() > 0)
	{
		uiItem = components.get(0);
		modelJson = uiItem.getModelJson();
		var modelJsonStruc = modelJson;
		modelJsonStruc = modelJsonStruc.getStructureByKey("sap.card");
		if (oFF.notNull(modelJsonStruc))
		{
			modelJsonStruc = modelJsonStruc.getStructureByKey("header");
			if (oFF.notNull(modelJsonStruc))
			{
				output.put("kpi", modelJsonStruc);
			}
		}
	}
	components = selector.selectComponentsByExpr("ui:.VizGrid", oFF.SigSelDomain.UI, null, 2);
	if (oFF.notNull(components) && components.size() > 0)
	{
		uiItem = components.get(0);
		modelJson = uiItem.getModelJson();
		output.put("grid", modelJson);
	}
	components = selector.selectComponentsByExpr("ui:.Text", oFF.SigSelDomain.UI, null, 2);
	if (oFF.notNull(components) && components.size() > 0)
	{
		var header = output.putNewStructure("header");
		uiItem = components.get(0);
		var text = uiItem.getText();
		header.putString("title", text);
		header.putString("description", text);
		header.putString("publicUrl", components.get(1).getText());
	}
	return output;
};

oFF.McCellType = function() {};
oFF.McCellType.prototype = new oFF.XConstantWithParent();
oFF.McCellType.prototype._ff_c = "McCellType";

oFF.McCellType.INITIAL = null;
oFF.McCellType.VALUE = null;
oFF.McCellType.STRING = null;
oFF.McCellType.DOUBLE = null;
oFF.McCellType.EXPRESSION = null;
oFF.McCellType.staticSetup = function()
{
	oFF.McCellType.INITIAL = oFF.McCellType.create("Initial", null);
	oFF.McCellType.VALUE = oFF.McCellType.create("Value", null);
	oFF.McCellType.STRING = oFF.McCellType.create("String", oFF.McCellType.VALUE);
	oFF.McCellType.DOUBLE = oFF.McCellType.create("Double", oFF.McCellType.DOUBLE);
	oFF.McCellType.EXPRESSION = oFF.McCellType.create("Expression", null);
};
oFF.McCellType.create = function(name, parent)
{
	var type = new oFF.McCellType();
	type.setupExt(name, parent);
	return type;
};

oFF.AuDatasourcePicker = function() {};
oFF.AuDatasourcePicker.prototype = new oFF.DfUiProgram();
oFF.AuDatasourcePicker.prototype._ff_c = "AuDatasourcePicker";

oFF.AuDatasourcePicker.DEFAULT_PROGRAM_NAME = "DatasourcePicker";
oFF.AuDatasourcePicker.PAGE_SIZE = 25;
oFF.AuDatasourcePicker.MAX_RECENT_RECORDS = 15;
oFF.AuDatasourcePicker.PARAM_APPLICATION = "application";
oFF.AuDatasourcePicker.PARAM_SYSTEM = "system";
oFF.AuDatasourcePicker.PARAM_LISTENER = "listener";
oFF.AuDatasourcePicker.DS_PICKER_RECENT = "dsPicker_recent";
oFF.AuDatasourcePicker.prototype.m_app = null;
oFF.AuDatasourcePicker.prototype.m_systemsByType = null;
oFF.AuDatasourcePicker.prototype.m_currentCatalogManager = null;
oFF.AuDatasourcePicker.prototype.m_currentData = null;
oFF.AuDatasourcePicker.prototype.m_currentPage = 0;
oFF.AuDatasourcePicker.prototype.m_startSystemName = null;
oFF.AuDatasourcePicker.prototype.m_root = null;
oFF.AuDatasourcePicker.prototype.m_systemTypeDd = null;
oFF.AuDatasourcePicker.prototype.m_systemDd = null;
oFF.AuDatasourcePicker.prototype.m_querySearch = null;
oFF.AuDatasourcePicker.prototype.m_queryTbl = null;
oFF.AuDatasourcePicker.prototype.m_left = null;
oFF.AuDatasourcePicker.prototype.m_right = null;
oFF.AuDatasourcePicker.prototype.m_recentTbl = null;
oFF.AuDatasourcePicker.prototype.m_cancelBtn = null;
oFF.AuDatasourcePicker.prototype.m_listener = null;
oFF.AuDatasourcePicker.prototype.newProgram = function()
{
	var prg = new oFF.AuDatasourcePicker();
	prg.setup();
	return prg;
};
oFF.AuDatasourcePicker.prototype.getDefaultProgramDevice = function()
{
	return oFF.ProgramDevice.DIALOG;
};
oFF.AuDatasourcePicker.prototype.doSetupProgramMetadata = function(metadata)
{
	oFF.DfUiProgram.prototype.doSetupProgramMetadata.call( this , metadata);
	metadata.addParameter(oFF.AuDatasourcePicker.PARAM_APPLICATION, "The application to use.");
	metadata.addParameter(oFF.AuDatasourcePicker.PARAM_SYSTEM, "The system that was picked earlier.");
	metadata.addParameter(oFF.AuDatasourcePicker.PARAM_LISTENER, "The system that was picked earlier.");
};
oFF.AuDatasourcePicker.prototype.evalArguments = function()
{
	oFF.DfUiProgram.prototype.evalArguments.call( this );
	this.m_app = this.getArguments().getXObjectByKey(oFF.AuDatasourcePicker.PARAM_APPLICATION);
	this.m_startSystemName = this.getArgumentStructure().getStringByKeyExt(oFF.AuDatasourcePicker.PARAM_SYSTEM, null);
	this.m_listener = this.getArguments().getXObjectByKey(oFF.AuDatasourcePicker.PARAM_LISTENER);
};
oFF.AuDatasourcePicker.prototype.initializeProgram = function()
{
	oFF.DfUiProgram.prototype.initializeProgram.call( this );
	if (oFF.isNull(this.m_app))
	{
		this.m_app = this.getApplication();
	}
	this.m_systemsByType = oFF.XHashMapByString.create();
	var systemLandscape = this.getProcess().getSystemLandscape();
	var systemIt = systemLandscape.getSystemNames().getIterator();
	while (systemIt.hasNext())
	{
		var systemName = systemIt.next();
		var systemDescription = systemLandscape.getSystemDescription(systemName);
		var systemTypeName = systemDescription.getSystemType().getName();
		var systems = this.m_systemsByType.getByKey(systemTypeName);
		if (oFF.isNull(systems))
		{
			systems = oFF.XList.create();
			this.m_systemsByType.put(systemTypeName, systems);
		}
		systems.add(systemDescription);
	}
	oFF.XObjectExt.release(systemIt);
};
oFF.AuDatasourcePicker.prototype.buildUi = function(genesis)
{
	this.m_root = genesis.newRoot(oFF.UiType.FLEX_LAYOUT);
	this.m_root.setDirection(oFF.UiFlexDirection.COLUMN);
	this.m_root.useMaxSpace();
	this.m_root.setPaddingCss("10px");
	var strip = this.m_root.addNewItemOfType(oFF.UiType.TAB_STRIP);
	this.buildCatalogUi(strip.addNewItem());
	this.buildRecentUi(strip.addNewItem());
	var startSystemDescription = this.m_app.getSystemLandscape().getSystemDescription(this.m_startSystemName);
	this.fillSystemTypes();
	if (oFF.notNull(startSystemDescription))
	{
		this.m_systemTypeDd.setSelectedName(startSystemDescription.getSystemType().getName());
	}
	this.fillSystems();
	if (oFF.notNull(startSystemDescription))
	{
		this.m_systemDd.setSelectedName(startSystemDescription.getSystemName());
	}
	this.fillQueries();
};
oFF.AuDatasourcePicker.prototype.buildCatalogUi = function(catalogTab)
{
	catalogTab.setText("Catalog");
	var catalogContent = catalogTab.setNewContent(oFF.UiType.FLEX_LAYOUT);
	catalogContent.setDirection(oFF.UiFlexDirection.COLUMN);
	var header = catalogContent.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	header.setJustifyContent(oFF.UiFlexJustifyContent.START);
	header.setAlignContent(oFF.UiFlexAlignContent.CENTER);
	this.m_systemTypeDd = header.addNewItemOfType(oFF.UiType.COMBO_BOX);
	this.m_systemTypeDd.setWidthCss("180px");
	this.m_systemTypeDd.setMarginCss("5px");
	this.m_systemTypeDd.setFlex("1 0 auto");
	this.m_systemTypeDd.registerOnSelect(this);
	this.m_systemDd = header.addNewItemOfType(oFF.UiType.COMBO_BOX);
	this.m_systemDd.setWidthCss("180px");
	this.m_systemDd.setMarginCss("5px");
	this.m_systemDd.setFlex("1 0 auto");
	this.m_systemDd.registerOnSelect(this);
	this.m_querySearch = header.addNewItemOfType(oFF.UiType.SEARCH_FIELD);
	this.m_querySearch.setWidthCss("220px");
	this.m_querySearch.setMarginCss("5px");
	this.m_querySearch.setFlex("2 0 auto");
	this.m_querySearch.registerOnSearch(this);
	this.m_querySearch.setName("DataSourcePickerSearch");
	this.m_queryTbl = catalogContent.addNewItemOfType(oFF.UiType.TABLE);
	this.m_queryTbl.setName("DataSourcePickerTable");
	this.m_queryTbl.setFlex("auto");
	this.m_queryTbl.setSelectionMode(oFF.UiSelectionMode.SINGLE_SELECT);
	this.m_queryTbl.setSelectionBehavior(oFF.UiSelectionBehavior.ROW);
	this.m_queryTbl.setVisibleRowCountMode(oFF.UiVisibleRowCountMode.AUTO);
	this.m_queryTbl.setMinRowCount(2);
	this.m_queryTbl.addNewColumn().setTitle("Name");
	this.m_queryTbl.addNewColumn().setTitle("Description");
	this.m_queryTbl.registerOnSelectionChange(this);
	var footer = catalogContent.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	footer.setJustifyContent(oFF.UiFlexJustifyContent.CENTER);
	this.m_left = footer.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_left.setIcon("navigation-left-arrow");
	this.m_left.setPaddingCss("4px");
	this.m_left.registerOnPress(this);
	this.m_right = footer.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_right.setIcon("navigation-right-arrow");
	this.m_right.setPaddingCss("4px");
	this.m_right.registerOnPress(this);
};
oFF.AuDatasourcePicker.prototype.buildRecentUi = function(recentTab)
{
	recentTab.setText("Recent");
	var recentContent = recentTab.setNewContent(oFF.UiType.FLEX_LAYOUT);
	recentContent.setDirection(oFF.UiFlexDirection.COLUMN);
	this.m_recentTbl = recentContent.addNewItemOfType(oFF.UiType.TABLE);
	this.m_recentTbl.setFlex("auto");
	this.m_recentTbl.setSelectionMode(oFF.UiSelectionMode.SINGLE_SELECT);
	this.m_recentTbl.setSelectionBehavior(oFF.UiSelectionBehavior.ROW);
	this.m_recentTbl.setVisibleRowCountMode(oFF.UiVisibleRowCountMode.AUTO);
	this.m_recentTbl.setMinRowCount(2);
	this.m_recentTbl.addNewColumn().setTitle("Name");
	this.m_recentTbl.addNewColumn().setTitle("Description");
	this.m_recentTbl.registerOnSelectionChange(this);
	this.m_recentTbl.setName("DataSourcePickerTable");
	this.loadRecent();
};
oFF.AuDatasourcePicker.prototype.getDialogButtons = function(genesis)
{
	this.m_cancelBtn = genesis.newControl(oFF.UiType.DIALOG_BUTTON);
	this.m_cancelBtn.setName("DataSourcePickerCancel");
	this.m_cancelBtn.setText("Cancel");
	this.m_cancelBtn.registerOnPress(this);
	var tmpList = oFF.XList.create();
	tmpList.add(this.m_cancelBtn);
	return tmpList;
};
oFF.AuDatasourcePicker.prototype.onSelect = function(event)
{
	var control = event.getControl();
	if (control === this.m_systemTypeDd)
	{
		this.fillSystems();
		this.fillQueries();
	}
	else if (control === this.m_systemDd)
	{
		this.fillQueries();
	}
};
oFF.AuDatasourcePicker.prototype.onSearch = function(event)
{
	var control = event.getControl();
	if (control === this.m_querySearch)
	{
		this.m_currentPage = 0;
		this.processFetch();
	}
};
oFF.AuDatasourcePicker.prototype.onPress = function(event)
{
	var control = event.getControl();
	if (control === this.m_left)
	{
		this.m_currentPage = this.m_currentPage - 1;
		this.processFetch();
	}
	else if (control === this.m_right)
	{
		this.m_currentPage = this.m_currentPage + 1;
		this.processFetch();
	}
	else if (control === this.m_cancelBtn)
	{
		this.saveRecent(null);
		this.exitNow(0);
	}
};
oFF.AuDatasourcePicker.prototype.loadRecent = function()
{
	this.m_recentTbl.clearRows();
	var recent = this.getProcess().getUserManager().getUserSettings().getStringByKey(oFF.AuDatasourcePicker.DS_PICKER_RECENT);
	if (oFF.XStringUtils.isNullOrEmpty(recent))
	{
		return;
	}
	var entries = oFF.XStringTokenizer.splitString(recent, ";");
	for (var i = 0; i < entries.size(); i++)
	{
		var entry = oFF.XStringTokenizer.splitString(entries.get(i), ",");
		if (oFF.isNull(entry) || entry.size() < 2)
		{
			continue;
		}
		var system = entry.get(0);
		var fullQualifiedName = entry.get(1);
		if (oFF.XStringUtils.isNullOrEmpty(system) || oFF.XStringUtils.isNullOrEmpty(fullQualifiedName))
		{
			continue;
		}
		var dataSource = oFF.QFactory.createDataSourceWithFqn(fullQualifiedName);
		dataSource.setSystemName(system);
		var row = this.m_recentTbl.addNewRow();
		row.addNewCell().setText(system);
		row.addNewCell().setText(dataSource.getName());
		row.setCustomObject(dataSource);
	}
};
oFF.AuDatasourcePicker.prototype.saveRecent = function(newDatasource)
{
	var buffer = oFF.XStringBuffer.create();
	var entries = oFF.XHashSetOfString.create();
	if (oFF.notNull(newDatasource))
	{
		var newEntry = oFF.XStringUtils.concatenate3(newDatasource.getSystemName(), ",", newDatasource.getFullQualifiedName());
		buffer.append(newEntry);
		entries.add(newEntry);
	}
	var rows = this.m_recentTbl.getRows();
	for (var i = 0; i < rows.size() && i < oFF.AuDatasourcePicker.MAX_RECENT_RECORDS - 1; i++)
	{
		var row = rows.get(i);
		var datasource = row.getCustomObject();
		var entry = oFF.XStringUtils.concatenate3(datasource.getSystemName(), ",", datasource.getFullQualifiedName());
		if (entries.contains(entry))
		{
			continue;
		}
		buffer.append(";").append(entry);
	}
	this.getProcess().getUserManager().getUserSettings().putString(oFF.AuDatasourcePicker.DS_PICKER_RECENT, buffer.toString());
};
oFF.AuDatasourcePicker.prototype.onSelectionChange = function(event)
{
	var control = event.getControl();
	var selectedItem = control.getSelectedItem();
	if (control === this.m_queryTbl)
	{
		var catalogItem = selectedItem.getCustomObject();
		var dataSource = oFF.QFactory.createDataSource();
		dataSource.setSystemName(this.m_systemDd.getSelectedName());
		dataSource.setType(catalogItem.getType());
		dataSource.setEnvironmentName(catalogItem.getEnvironmentName());
		dataSource.setSchemaName(catalogItem.getSchemaName());
		dataSource.setPackageName(catalogItem.getPackageName());
		dataSource.setObjectName(catalogItem.getObjectName());
		this.saveRecent(dataSource);
		this.m_listener.onDatasourceSelected(dataSource);
		this.exitNow(0);
	}
	else if (control === this.m_recentTbl)
	{
		var selectedDatasource = selectedItem.getCustomObject();
		this.saveRecent(selectedDatasource);
		this.m_listener.onDatasourceSelected(selectedDatasource);
		this.exitNow(0);
	}
};
oFF.AuDatasourcePicker.prototype.fillSystemTypes = function()
{
	this.m_systemTypeDd.clearItems();
	this.m_systemTypeDd.addNewItem();
	var systemTypeNames = this.m_systemsByType.getKeysAsReadOnlyListOfString();
	for (var i = 0; i < systemTypeNames.size(); i++)
	{
		var systemTypeName = systemTypeNames.get(i);
		var item = this.m_systemTypeDd.addNewItem();
		item.setName(systemTypeName).setText(systemTypeName);
	}
};
oFF.AuDatasourcePicker.prototype.fillSystems = function()
{
	this.m_systemDd.setEnabled(false);
	this.m_systemDd.clearItems();
	var systemTypeName = this.m_systemTypeDd.getSelectedName();
	if (oFF.XStringUtils.isNullOrEmpty(systemTypeName))
	{
		return;
	}
	this.m_systemDd.addNewItem();
	var systems = this.m_systemsByType.getByKey(systemTypeName);
	for (var i = 0; i < systems.size(); i++)
	{
		var system = systems.get(i);
		var item = this.m_systemDd.addNewItem();
		item.setName(system.getName()).setText(system.getName());
	}
	this.m_systemDd.setEnabled(true);
};
oFF.AuDatasourcePicker.prototype.fillQueries = function()
{
	this.m_querySearch.setEnabled(false);
	this.m_left.setEnabled(false);
	this.m_right.setEnabled(false);
	this.m_currentPage = 0;
	this.m_queryTbl.clearRows();
	oFF.XObjectExt.release(this.m_currentCatalogManager);
	var systemName = this.m_systemDd.getSelectedName();
	if (oFF.XStringUtils.isNullOrEmpty(systemName))
	{
		return;
	}
	this.createCatalogManager();
};
oFF.AuDatasourcePicker.prototype.createCatalogManager = function()
{
	var systemTypeName = this.m_systemTypeDd.getSelectedName();
	var systems = this.m_systemsByType.getByKey(systemTypeName);
	if (oFF.isNull(systems))
	{
		return;
	}
	var systemName = this.m_systemDd.getSelectedName();
	var system = this.findSystem(systems, systemName);
	if (oFF.isNull(system))
	{
		return;
	}
	var serviceConfig = oFF.OlapCatalogApiModule.SERVICE_TYPE_OLAP_CATALOG.createServiceConfig(this.m_app);
	serviceConfig.setSystemName(systemName);
	this.m_queryTbl.setBusy(true);
	serviceConfig.processOlapCatalogManagerCreation(oFF.SyncType.NON_BLOCKING, this, null);
};
oFF.AuDatasourcePicker.prototype.onOlapCatalogManagerCreated = function(extResult, olapCatalogManager, customIdentifier)
{
	this.m_queryTbl.setBusy(false);
	if (extResult.hasErrors())
	{
		this.showError(extResult.getSummary());
		return;
	}
	this.m_currentCatalogManager = extResult.getData();
	var systemType = oFF.SystemType.lookup(this.m_systemTypeDd.getSelectedName());
	if (systemType.isTypeOf(oFF.SystemType.ABAP))
	{
		this.m_currentCatalogManager.setSelectedType(oFF.MetaObjectType.QUERY);
	}
	else if (systemType.isTypeOf(oFF.SystemType.HANA))
	{
		this.m_currentCatalogManager.setSelectedType(oFF.MetaObjectType.DBVIEW);
	}
	else if (systemType.isTypeOf(oFF.SystemType.UNV))
	{
		this.m_currentCatalogManager.setSelectedType(oFF.MetaObjectType.UNX);
	}
	else
	{
		throw oFF.XException.createIllegalArgumentException(oFF.XStringUtils.concatenate2("no meta object type for system ", this.m_systemTypeDd.getSelectedName()));
	}
	this.m_currentCatalogManager.setResultMaxSize(oFF.AuDatasourcePicker.PAGE_SIZE + 1);
	this.processFetch();
	this.m_querySearch.setEnabled(true);
};
oFF.AuDatasourcePicker.prototype.findSystem = function(systems, systemName)
{
	for (var i = 0; i < systems.size(); i++)
	{
		var system = systems.get(i);
		if (oFF.XString.isEqual(systemName, system.getName()))
		{
			return system;
		}
	}
	return null;
};
oFF.AuDatasourcePicker.prototype.processFetch = function()
{
	this.m_currentCatalogManager.setSearchFilter(null);
	if (oFF.XStringUtils.isNotNullAndNotEmpty(this.m_querySearch.getText()))
	{
		var searchString = oFF.XStringUtils.concatenate3("*", this.m_querySearch.getText(), "*");
		this.m_currentCatalogManager.setSearchFilter(searchString);
		this.m_currentCatalogManager.setSearchOnName(true);
	}
	this.m_currentCatalogManager.setResultOffset(this.m_currentPage * oFF.AuDatasourcePicker.PAGE_SIZE);
	this.m_queryTbl.setBusy(true);
	this.m_currentCatalogManager.processGetResult(oFF.SyncType.NON_BLOCKING, this, null);
};
oFF.AuDatasourcePicker.prototype.onOlapCatalogResult = function(extResult, result, customIdentifier)
{
	this.m_queryTbl.setBusy(false);
	if (extResult.hasErrors())
	{
		this.showError(extResult.getSummary());
		return;
	}
	this.m_currentData = extResult.getData().getObjectsList();
	this.updateTable();
};
oFF.AuDatasourcePicker.prototype.updateTable = function()
{
	this.m_queryTbl.clearRows();
	for (var i = 0; i < this.m_currentData.size(); i++)
	{
		if (i >= oFF.AuDatasourcePicker.PAGE_SIZE)
		{
			break;
		}
		var catalogItem = this.m_currentData.get(i);
		var row = this.m_queryTbl.addNewRow();
		row.addNewCell().setText(catalogItem.getName());
		row.addNewCell().setText(catalogItem.getText());
		row.setCustomObject(catalogItem);
	}
	this.updatePageButtons();
};
oFF.AuDatasourcePicker.prototype.updatePageButtons = function()
{
	this.m_left.setEnabled(this.m_currentPage > 0);
	this.m_right.setEnabled(this.m_currentData.size() > oFF.AuDatasourcePicker.PAGE_SIZE);
};
oFF.AuDatasourcePicker.prototype.showError = function(msg)
{
	this.getGenesis().showErrorToast(msg);
};
oFF.AuDatasourcePicker.prototype.releaseObject = function()
{
	this.m_systemsByType = oFF.XObjectExt.release(this.m_systemsByType);
	this.m_currentCatalogManager = oFF.XObjectExt.release(this.m_currentCatalogManager);
	this.m_currentData = oFF.XObjectExt.release(this.m_currentData);
	this.m_startSystemName = null;
	this.m_root = oFF.XObjectExt.release(this.m_root);
	this.m_systemTypeDd = null;
	this.m_systemDd = null;
	this.m_querySearch = null;
	this.m_queryTbl = null;
	this.m_left = null;
	this.m_right = null;
	this.m_recentTbl = null;
	this.m_cancelBtn = null;
	this.m_listener = null;
	oFF.DfUiProgram.prototype.releaseObject.call( this );
};

oFF.CatalogDialogDummyProgram = function() {};
oFF.CatalogDialogDummyProgram.prototype = new oFF.DfUiProgram();
oFF.CatalogDialogDummyProgram.prototype._ff_c = "CatalogDialogDummyProgram";

oFF.CatalogDialogDummyProgram.DEFAULT_PROGRAM_NAME = "Catalog";
oFF.CatalogDialogDummyProgram.CURRENCY_CATALOG_BUTTON = "currencyCatalogButton";
oFF.CatalogDialogDummyProgram.CURRENCY_TRANSLATION_CATALOG_BUTTON = "currencyTranslationCatalogButton";
oFF.CatalogDialogDummyProgram.HIERARCHY_CATALOG_BUTTON = "hierarchyCatalogButton";
oFF.CatalogDialogDummyProgram.PARAM_SYSTEM = "system";
oFF.CatalogDialogDummyProgram.PARAM_DATASOURCE = "datasource";
oFF.CatalogDialogDummyProgram.PARAM_DIMENSION = "dimension";
oFF.CatalogDialogDummyProgram.prototype.m_root = null;
oFF.CatalogDialogDummyProgram.prototype.m_system = null;
oFF.CatalogDialogDummyProgram.prototype.m_datasource = null;
oFF.CatalogDialogDummyProgram.prototype.m_dimension = null;
oFF.CatalogDialogDummyProgram.prototype.m_messageManager = null;
oFF.CatalogDialogDummyProgram.prototype.m_queryManager = null;
oFF.CatalogDialogDummyProgram.prototype.m_layout = null;
oFF.CatalogDialogDummyProgram.prototype.m_systemInput = null;
oFF.CatalogDialogDummyProgram.prototype.m_dataSourceInput = null;
oFF.CatalogDialogDummyProgram.prototype.m_dimensionInput = null;
oFF.CatalogDialogDummyProgram.prototype.m_currencyCatalogButton = null;
oFF.CatalogDialogDummyProgram.prototype.m_currencyTranslationCatalogButton = null;
oFF.CatalogDialogDummyProgram.prototype.m_hierarchyCatalogButton = null;
oFF.CatalogDialogDummyProgram.prototype.m_currencyCatalogController = null;
oFF.CatalogDialogDummyProgram.prototype.m_currencyTranslationCatalogController = null;
oFF.CatalogDialogDummyProgram.prototype.m_hierarchyCatalogController = null;
oFF.CatalogDialogDummyProgram.prototype.getParameterValue = function(name)
{
	var value = this.getSession().getEnvironment().getStringByKey(name);
	if (oFF.XStringUtils.isNullOrEmpty(value))
	{
		value = this.getArgumentStructure().getStringByKey(name);
	}
	return value;
};
oFF.CatalogDialogDummyProgram.prototype.evalArguments = function()
{
	oFF.DfUiProgram.prototype.evalArguments.call( this );
	this.m_system = this.getParameterValue(oFF.CatalogDialogDummyProgram.PARAM_SYSTEM);
	this.m_datasource = this.getParameterValue(oFF.CatalogDialogDummyProgram.PARAM_DATASOURCE);
	this.m_dimension = this.getParameterValue(oFF.CatalogDialogDummyProgram.PARAM_DIMENSION);
	if (oFF.XStringUtils.isNullOrEmpty(this.m_system) && oFF.XStringUtils.isNullOrEmpty(this.m_datasource))
	{
		this.m_system = "KIW";
		this.m_datasource = "query:[0BICS_C03_BICSTEST_Q0020]";
		this.m_dimension = "0BC_CUST";
	}
};
oFF.CatalogDialogDummyProgram.prototype.newProgram = function()
{
	var prg = new oFF.CatalogDialogDummyProgram();
	prg.setup();
	return prg;
};
oFF.CatalogDialogDummyProgram.prototype.buildUi = function(genesis)
{
	oFF.DfUiProgram.prototype.buildUi.call( this , genesis);
	var displayManager = oFF.OlapUiDisplayFactory.createFactoryForDialog(this.getUiManager());
	var context = oFF.OlapUiContext.createContext(this.getUiManager(), displayManager);
	this.m_currencyCatalogController = oFF.CurrencyCatalogController.create(context);
	this.m_currencyTranslationCatalogController = oFF.CurrencyTranslationCatalogController.create(context);
	this.m_hierarchyCatalogController = oFF.HierarchyCatalogController.create(context);
	this.m_root = this.buildTree(genesis);
	genesis.setRoot(this.m_root);
	this.setTitle("\u03C0\u03BF\u03B4\u03B7\u03BB\u03AC\u03C4\u03B7\u03C2 client");
};
oFF.CatalogDialogDummyProgram.prototype.buildTree = function(genesis)
{
	this.m_layout = genesis.newControl(oFF.UiType.VERTICAL_LAYOUT);
	this.m_systemInput = genesis.newControl(oFF.UiType.INPUT);
	this.m_dataSourceInput = genesis.newControl(oFF.UiType.INPUT);
	this.m_dimensionInput = genesis.newControl(oFF.UiType.INPUT);
	this.m_systemInput.registerOnLiveChange(this);
	this.m_dataSourceInput.registerOnLiveChange(this);
	this.m_dimensionInput.registerOnLiveChange(this);
	this.m_currencyTranslationCatalogButton = this.m_layout.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_currencyTranslationCatalogButton.setText("Currency Translations ...");
	this.m_currencyTranslationCatalogButton.setName(oFF.CatalogDialogDummyProgram.CURRENCY_TRANSLATION_CATALOG_BUTTON);
	this.m_currencyTranslationCatalogButton.registerOnPress(this);
	this.m_currencyCatalogButton = this.m_layout.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_currencyCatalogButton.setText("Target Currencies ...");
	this.m_currencyCatalogButton.setName(oFF.CatalogDialogDummyProgram.CURRENCY_CATALOG_BUTTON);
	this.m_currencyCatalogButton.registerOnPress(this);
	this.m_hierarchyCatalogButton = this.m_layout.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_hierarchyCatalogButton.setText("Hierarchies ...");
	this.m_hierarchyCatalogButton.setName(oFF.CatalogDialogDummyProgram.HIERARCHY_CATALOG_BUTTON);
	this.m_hierarchyCatalogButton.registerOnPress(this);
	this.fillDataSourceSeletWidgets();
	return this.m_layout;
};
oFF.CatalogDialogDummyProgram.prototype.fillDataSourceSeletWidgets = function()
{
	this.m_systemInput.setText(this.m_system);
	this.m_dataSourceInput.setText(this.m_datasource);
};
oFF.CatalogDialogDummyProgram.prototype.initializeProgram = function()
{
	oFF.DfUiProgram.prototype.initializeProgram.call( this );
	oFF.ApplicationUiModule.getInstance();
	this.m_messageManager = oFF.MessageManager.createMessageManagerExt(this.getSession());
	oFF.OlapUiValueHelpAbstract.s_syncType = oFF.SyncType.BLOCKING;
	var traceInfo = oFF.TraceInfo.create();
	traceInfo.setTraceType(oFF.TraceType.URL);
	traceInfo.setTraceName("catalog dialog");
	this.getApplication().getConnectionPool().setTraceInfo(this.m_system, traceInfo);
};
oFF.CatalogDialogDummyProgram.prototype.onPress = function(event)
{
	var control = event.getControl();
	var controlName = control.getName();
	switch (controlName)
	{
		case oFF.CatalogDialogDummyProgram.CURRENCY_CATALOG_BUTTON:
			this.createCurrencyCatalog();
			break;

		case oFF.CatalogDialogDummyProgram.CURRENCY_TRANSLATION_CATALOG_BUTTON:
			this.createCurrencyTranslationCatalog();
			break;

		case oFF.CatalogDialogDummyProgram.HIERARCHY_CATALOG_BUTTON:
			this.createHierarchyCatalog();
			break;
	}
};
oFF.CatalogDialogDummyProgram.prototype.createCurrencyCatalog = function()
{
	var serviceConfig = oFF.OlapCatalogApiModule.SERVICE_TYPE_OLAP_CATALOG.createServiceConfig(this.getApplication());
	serviceConfig.setSystemName(this.m_system);
	serviceConfig.processCurrencyCatalogManagerCreation(oFF.SyncType.NON_BLOCKING, this, oFF.XStringValue.create("currencyCatalog"));
};
oFF.CatalogDialogDummyProgram.prototype.createCurrencyTranslationCatalog = function()
{
	var serviceConfig = oFF.OlapCatalogApiModule.SERVICE_TYPE_OLAP_CATALOG.createServiceConfig(this.getApplication());
	serviceConfig.setSystemName(this.m_system);
	serviceConfig.processCurrencyTranslationCatalogManagerCreation(oFF.SyncType.NON_BLOCKING, this, null);
};
oFF.CatalogDialogDummyProgram.prototype.createHierarchyCatalog = function()
{
	if (oFF.XStringUtils.isNotNullAndNotEmpty(this.m_datasource))
	{
		var serviceConfigQuery = oFF.QueryServiceConfig.createWithDataSourceName(this.getApplication(), this.m_system, this.m_datasource);
		var syncAction = serviceConfigQuery.processQueryManagerCreation(oFF.SyncType.BLOCKING, null, null);
		if (syncAction.hasErrors())
		{
			this.m_messageManager.addAllMessages(syncAction);
			return;
		}
		this.m_queryManager = syncAction.getData();
	}
	var queryModel = this.m_queryManager.getQueryModel();
	var serviceConfig = oFF.OlapApiModule.SERVICE_TYPE_HIERARCHY_CATALOG.createServiceConfig(this.getApplication());
	serviceConfig.setSystemName(this.m_system);
	var dataSource = queryModel.getDataSource().getFullQualifiedName();
	serviceConfig.setDataSourceName(dataSource);
	serviceConfig.setDimension(queryModel.getDimensionByName(this.m_dimension));
	serviceConfig.processHierarchyCatalogManagerCreation(oFF.SyncType.NON_BLOCKING, this, null).getData();
};
oFF.CatalogDialogDummyProgram.prototype.onSubmit = function() {};
oFF.CatalogDialogDummyProgram.prototype.onClose = function() {};
oFF.CatalogDialogDummyProgram.prototype.onLiveChange = function(event) {};
oFF.CatalogDialogDummyProgram.prototype.onHierarchyCatalogManagerCreated = function(extResult, hierarchyCatalogManager, customIdentifier)
{
	var catalogManager = extResult.getData();
	this.m_hierarchyCatalogController.openDialog("Hierarchy", catalogManager, null, null, this, null);
};
oFF.CatalogDialogDummyProgram.prototype.onOlapCatalogManagerCreated = function(extResult, olapCatalogManager, customIdentifier)
{
	var catalogManager = extResult.getData();
	if (oFF.isNull(customIdentifier))
	{
		this.m_currencyTranslationCatalogController.openDialog("Select your currency conversion", catalogManager, null, null, this);
	}
	else
	{
		this.m_currencyCatalogController.openDialog("Select your target currency", catalogManager, null, null, this);
	}
};

oFF.DimensionDialogTestProgram = function() {};
oFF.DimensionDialogTestProgram.prototype = new oFF.DfUiProgram();
oFF.DimensionDialogTestProgram.prototype._ff_c = "DimensionDialogTestProgram";

oFF.DimensionDialogTestProgram.DEFAULT_PROGRAM_NAME = "Podilates";
oFF.DimensionDialogTestProgram.CONTEXT_MENU = "contextMenu";
oFF.DimensionDialogTestProgram.EXPAND_MENU = "expand";
oFF.DimensionDialogTestProgram.DRILL_MENU = "drill";
oFF.DimensionDialogTestProgram.COLLAPSE_MENU = "collapse";
oFF.DimensionDialogTestProgram.DIMENSION_CONTEXT_MENU = "dimensionContextMenu";
oFF.DimensionDialogTestProgram.FILTER_CONTEXT_MENU = "filterContextMenu";
oFF.DimensionDialogTestProgram.DATACELL_MENU = "datacellMenu";
oFF.DimensionDialogTestProgram.DIMENSION_MENU = "dimensionMenu";
oFF.DimensionDialogTestProgram.DIMENSION_EXHAUSTIVE_MENU = "dimensionExhaustiveMenu";
oFF.DimensionDialogTestProgram.DIMENSION_BTN = "dimensionBtn";
oFF.DimensionDialogTestProgram.DIMENSION_EXH_BTN = "dimensionExhBtn";
oFF.DimensionDialogTestProgram.LAYOUT_BTN = "layoutBtn";
oFF.DimensionDialogTestProgram.SELECT_SYSTEM_BTN = "selectSystemBtn";
oFF.DimensionDialogTestProgram.SELECT_SYSTEM_BW_MENU = "selectSystemBwMenu";
oFF.DimensionDialogTestProgram.SELECT_SYSTEM_BW_2STRUCTURES = "selectSystemBw2StrcutMenu";
oFF.DimensionDialogTestProgram.SELECT_SYSTEM_GIPSY_MENU = "selectSystemGips<Menu";
oFF.DimensionDialogTestProgram.SELECT_SYSTEM_MDS_MENU = "selectSystemMdsMenu";
oFF.DimensionDialogTestProgram.SELECT_SYSTEM_MDS_LEGACY_CUR_TRANS = "selectSystemMdsLegacyCurTrans";
oFF.DimensionDialogTestProgram.SELECT_SYSTEM_MDS_ACCOUNT_WITH_MD = "selectSystemMdsAccountWithMd";
oFF.DimensionDialogTestProgram.SELECT_SYSTEM_MDS_MEASURE_WITHOUT_MD = "selectSystemMdsMeasureWithoutMd";
oFF.DimensionDialogTestProgram.QUERY_BUTTON = "queryButton";
oFF.DimensionDialogTestProgram.CUR_CONV_BUTTON = "curConvButton";
oFF.DimensionDialogTestProgram.PARAM_SYSTEM = "system";
oFF.DimensionDialogTestProgram.PARAM_DATASOURCE = "datasource";
oFF.DimensionDialogTestProgram.PARAM_TEST = "test";
oFF.DimensionDialogTestProgram.createRunner = function()
{
	return oFF.KernelBoot.createByName(oFF.DimensionDialogTestProgram.DEFAULT_PROGRAM_NAME);
};
oFF.DimensionDialogTestProgram.getResultSet = function(queryManager)
{
	var resultSetContainer = queryManager.getActiveResultSetContainer();
	if (oFF.isNull(resultSetContainer))
	{
		throw oFF.XException.createRuntimeException("ResultSetContainer null");
	}
	if (resultSetContainer.hasErrors())
	{
		throw oFF.XException.createRuntimeException(resultSetContainer.getSummary());
	}
	var resultSet = resultSetContainer.getClassicResultSet();
	if (oFF.isNull(resultSet))
	{
		if (resultSetContainer.hasErrors())
		{
			throw oFF.XException.createRuntimeException(resultSetContainer.getSummary());
		}
		throw oFF.XException.createRuntimeException("ResultSet null");
	}
	if (resultSet.hasErrors())
	{
		throw oFF.XException.createRuntimeException(resultSet.getSummary());
	}
	return resultSet;
};
oFF.DimensionDialogTestProgram.prototype.m_root = null;
oFF.DimensionDialogTestProgram.prototype.m_system = null;
oFF.DimensionDialogTestProgram.prototype.m_datasource = null;
oFF.DimensionDialogTestProgram.prototype.m_messageManager = null;
oFF.DimensionDialogTestProgram.prototype.m_queryManager = null;
oFF.DimensionDialogTestProgram.prototype.m_grid = null;
oFF.DimensionDialogTestProgram.prototype.m_layout = null;
oFF.DimensionDialogTestProgram.prototype.m_dimPropBtn = null;
oFF.DimensionDialogTestProgram.prototype.m_dimExhPropBtn = null;
oFF.DimensionDialogTestProgram.prototype.m_dimPropMenu = null;
oFF.DimensionDialogTestProgram.prototype.m_dimExhPropMenu = null;
oFF.DimensionDialogTestProgram.prototype.m_layoutBtn = null;
oFF.DimensionDialogTestProgram.prototype.m_systemBtn = null;
oFF.DimensionDialogTestProgram.prototype.m_systemInput = null;
oFF.DimensionDialogTestProgram.prototype.m_dataSourceInput = null;
oFF.DimensionDialogTestProgram.prototype.m_queryButton = null;
oFF.DimensionDialogTestProgram.prototype.m_curConvBtn = null;
oFF.DimensionDialogTestProgram.prototype.m_datacellBtn = null;
oFF.DimensionDialogTestProgram.prototype.m_datacellBtn2 = null;
oFF.DimensionDialogTestProgram.prototype.m_test = null;
oFF.DimensionDialogTestProgram.prototype.m_argumentStructure = null;
oFF.DimensionDialogTestProgram.prototype.m_contextMenu = null;
oFF.DimensionDialogTestProgram.prototype.getParameterValue = function(name)
{
	var value = this.getSession().getEnvironment().getStringByKey(name);
	if (oFF.XStringUtils.isNullOrEmpty(value))
	{
		value = this.m_argumentStructure.getStringByKey(name);
	}
	return value;
};
oFF.DimensionDialogTestProgram.prototype.getDefaultWindowSize = function()
{
	return oFF.UiSizeValue.createByCss("60%", "60%");
};
oFF.DimensionDialogTestProgram.prototype.evalArguments = function()
{
	this.m_argumentStructure = this.getArgumentStructure();
	if (this.m_argumentStructure.getIntegerByKeyExt(oFF.DfProgram.PARAM_XVERSION, -1) === -1)
	{
		this.m_argumentStructure.putInteger(oFF.DfProgram.PARAM_XVERSION, oFF.XVersion.V124_INIT_ACTION_FOR_FUSION);
	}
	oFF.DfUiProgram.prototype.evalArguments.call( this );
	this.m_system = this.getParameterValue(oFF.DimensionDialogTestProgram.PARAM_SYSTEM);
	this.m_datasource = this.getParameterValue(oFF.DimensionDialogTestProgram.PARAM_DATASOURCE);
	this.m_test = this.getParameterValue(oFF.DimensionDialogTestProgram.PARAM_TEST);
	if (oFF.XStringUtils.isNullOrEmpty(this.m_system) && oFF.XStringUtils.isNullOrEmpty(this.m_datasource))
	{
		this.m_system = "KIW";
		this.m_datasource = "query:[0BICS_C03_BICSTEST_Q0020]";
	}
};
oFF.DimensionDialogTestProgram.prototype.newProgram = function()
{
	var prg = new oFF.DimensionDialogTestProgram();
	prg.setup();
	return prg;
};
oFF.DimensionDialogTestProgram.prototype.doSetupProgramMetadata = function(metadata)
{
	oFF.DfUiProgram.prototype.doSetupProgramMetadata.call( this , metadata);
	metadata.addParameter(oFF.DimensionDialogTestProgram.PARAM_SYSTEM, "The system to connect to.");
	metadata.addParameter(oFF.DimensionDialogTestProgram.PARAM_DATASOURCE, "The datasource to be used (Can be empty for planning sequences).");
	metadata.addParameter(oFF.DimensionDialogTestProgram.PARAM_TEST, "The name of the running test (Optional).");
};
oFF.DimensionDialogTestProgram.prototype.isShowMenuBar = function()
{
	return true;
};
oFF.DimensionDialogTestProgram.prototype.buildUi = function(genesis)
{
	oFF.DfUiProgram.prototype.buildUi.call( this , genesis);
	this.m_root = this.buildTree(genesis);
	genesis.setRoot(this.m_root);
	this.setTitle("\u03C0\u03BF\u03B4\u03B7\u03BB\u03AC\u03C4\u03B7\u03C2 client");
};
oFF.DimensionDialogTestProgram.prototype.buildTree = function(genesis)
{
	this.m_layout = genesis.newControl(oFF.UiType.VERTICAL_LAYOUT);
	var programToolbar = this.getMenuBar();
	this.m_layoutBtn = programToolbar.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_layoutBtn.setButtonType(oFF.UiButtonType.TRANSPARENT);
	this.m_layoutBtn.setName(oFF.DimensionDialogTestProgram.LAYOUT_BTN);
	this.m_layoutBtn.setText("Dimension Layout...");
	this.m_layoutBtn.registerOnPress(this);
	this.m_dimPropBtn = programToolbar.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_dimPropBtn.setButtonType(oFF.UiButtonType.TRANSPARENT);
	this.m_dimPropBtn.setName(oFF.DimensionDialogTestProgram.DIMENSION_BTN);
	this.m_dimPropBtn.setText("Dimension Properties");
	this.m_dimPropBtn.registerOnPress(this);
	this.m_dimExhPropBtn = programToolbar.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_dimExhPropBtn.setButtonType(oFF.UiButtonType.TRANSPARENT);
	this.m_dimExhPropBtn.setName(oFF.DimensionDialogTestProgram.DIMENSION_EXH_BTN);
	this.m_dimExhPropBtn.setText("Dimension Props Exhaustive");
	this.m_dimExhPropBtn.registerOnPress(this);
	this.m_dimPropMenu = genesis.newControl(oFF.UiType.MENU);
	this.m_dimPropMenu.setName(oFF.DimensionDialogTestProgram.DIMENSION_MENU);
	this.m_dimExhPropMenu = genesis.newControl(oFF.UiType.MENU);
	this.m_dimExhPropMenu.setName(oFF.DimensionDialogTestProgram.DIMENSION_EXHAUSTIVE_MENU);
	this.m_curConvBtn = programToolbar.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_curConvBtn.setButtonType(oFF.UiButtonType.TRANSPARENT);
	this.m_curConvBtn.setName(oFF.DimensionDialogTestProgram.CUR_CONV_BUTTON);
	this.m_curConvBtn.setText("Currency Conversion ...");
	this.m_curConvBtn.registerOnPress(this);
	this.m_datacellBtn = programToolbar.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_datacellBtn.setButtonType(oFF.UiButtonType.TRANSPARENT);
	this.m_datacellBtn.setName("DataCellProps");
	this.m_datacellBtn.setText("DataCell Props");
	this.m_datacellBtn.registerOnPress(this);
	this.m_datacellBtn2 = programToolbar.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_datacellBtn2.setButtonType(oFF.UiButtonType.TRANSPARENT);
	this.m_datacellBtn2.setName("DataCellProps2");
	this.m_datacellBtn2.setText("DataCell Props2");
	this.m_datacellBtn2.registerOnPress(this);
	this.m_systemBtn = programToolbar.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_systemBtn.setButtonType(oFF.UiButtonType.TRANSPARENT);
	this.m_systemBtn.setName(oFF.DimensionDialogTestProgram.SELECT_SYSTEM_BTN);
	this.m_systemBtn.setText("Select System ...");
	this.m_systemBtn.registerOnPress(this);
	this.m_systemInput = genesis.newControl(oFF.UiType.INPUT);
	this.m_systemInput.setName("systemInputName");
	this.m_dataSourceInput = genesis.newControl(oFF.UiType.INPUT);
	this.m_dataSourceInput.setName("dataSourceInputName");
	this.m_systemInput.registerOnLiveChange(this);
	this.m_dataSourceInput.registerOnLiveChange(this);
	oFF.DdControllerAbstract.addEditablePropertyVerticalLayout(this.m_layout, "System", "System", this.m_systemInput);
	oFF.DdControllerAbstract.addEditablePropertyVerticalLayout(this.m_layout, "Datasource", "Datasource", this.m_dataSourceInput);
	this.m_queryButton = this.m_layout.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_queryButton.setText("Perform Query");
	this.m_queryButton.setName(oFF.DimensionDialogTestProgram.QUERY_BUTTON);
	this.m_queryButton.registerOnPress(this);
	this.m_grid = this.m_layout.addNewItemOfType(oFF.UiType.SAC_TABLE_GRID).setWidthCss("100%").setHeightExt(50, oFF.UiSizeUnit.EM);
	this.m_grid.registerOnClick(this);
	this.m_grid.registerOnContextMenu(this);
	this.m_grid.setEnabled(true);
	this.fillDataSourceSeletWidgets();
	this.m_contextMenu = genesis.newControl(oFF.UiType.MENU);
	this.m_contextMenu.setName(oFF.DimensionDialogTestProgram.CONTEXT_MENU);
	return this.m_layout;
};
oFF.DimensionDialogTestProgram.prototype.doQuery = function()
{
	this.m_queryButton.setEnabled(false);
	this.updateQueryModel();
	this.updateGrid();
	this.updateDimensionMenu();
	this.m_dimPropMenu.setEnabled(true);
	this.m_dimExhPropMenu.setEnabled(true);
	this.m_curConvBtn.setEnabled(true);
	this.m_dimPropBtn.setEnabled(true);
	this.m_dimExhPropBtn.setEnabled(true);
	this.m_layoutBtn.setEnabled(true);
};
oFF.DimensionDialogTestProgram.prototype.fillDataSourceSeletWidgets = function()
{
	this.m_systemInput.setText(this.m_system);
	this.m_dataSourceInput.setText(this.m_datasource);
	this.needsQuery();
};
oFF.DimensionDialogTestProgram.prototype.updateQueryModel = function()
{
	if (oFF.XStringUtils.isNotNullAndNotEmpty(this.m_datasource))
	{
		this.getSession().activateFeatureToggle(oFF.FeatureToggleOlap.DEVELOPMENT_MODE);
		this.getSession().activateFeatureToggle(oFF.FeatureToggleOlap.CURRENCY_TRANSLATION);
		this.getSession().activateFeatureToggle(oFF.FeatureToggleOlap.MEASURE_MEMBER_CURRENCY_TRANSLATIONS);
		var serviceConfig = oFF.QueryServiceConfig.createWithDataSourceName(this.getApplication(), this.m_system, this.m_datasource);
		var syncAction = serviceConfig.processQueryManagerCreation(oFF.SyncType.BLOCKING, null, null);
		if (syncAction.hasErrors())
		{
			this.m_messageManager.addAllMessages(syncAction);
			return;
		}
		this.m_queryManager = syncAction.getData();
	}
	var queryModel = this.m_queryManager.getQueryModel();
	var acc = queryModel.getAccountDimension();
	if (oFF.notNull(acc))
	{
		acc.setHierarchyName("parentId");
		acc.setHierarchyActive(true);
		queryModel.getColumnsAxis().add(acc);
	}
	var curTransMan = queryModel.getCurrencyTranslationManager();
	if (queryModel.getModelCapabilities().supportsCurrencyTranslation() && oFF.notNull(curTransMan) && !oFF.XCollectionUtils.hasElements(curTransMan.getAvailableCurrencies()))
	{
		curTransMan.addAvailableCurrency("EUR", "Euro");
		curTransMan.addAvailableCurrency("USD", "Dollar");
		curTransMan.addAvailableCurrency("INR", "\u0930\u0941\u092A\u092F\u093E");
		curTransMan.addAvailableCurrency("RUB", "\u0420\u0443\u0431\u043B\u0435\u0439");
		var curTrans = curTransMan.addNewMeasureCurrencyTranslation("RUB", "\u0420\u0443\u0431\u043B\u0435\u0439");
		curTrans.setFixedTargetCurrencyByString("RUB");
		curTrans.setFixedReferenceDateByString("2020-05-05");
		curTrans.setFixedRateNameByString("EURX");
		curTrans = curTransMan.addNewMeasureCurrencyTranslation("EUR", "Euro");
		curTrans.setFixedTargetCurrencyByString("EUR");
		curTrans.setFixedReferenceDateByString("2020-05-05");
		curTrans.setFixedRateNameByString("EURX");
		curTrans = curTransMan.addNewMeasureCurrencyTranslation("INR", "\u0930\u0941\u092A\u092F\u093E");
		curTrans.setFixedTargetCurrencyByString("INR");
		curTrans.setFixedReferenceDateByString("2020-05-05");
		curTrans.setFixedRateNameByString("EURX");
	}
	this.m_layoutBtn.setCustomObject(queryModel);
};
oFF.DimensionDialogTestProgram.prototype.updateDimensionMenu = function()
{
	this.m_dimPropMenu.clearItems();
	this.m_dimExhPropMenu.clearItems();
	this.decorateDimensionMenues(this.m_queryManager.getQueryModel().getRowsAxis().getDimensions());
	this.decorateDimensionMenues(this.m_queryManager.getQueryModel().getColumnsAxis().getDimensions());
};
oFF.DimensionDialogTestProgram.prototype.decorateDimensionMenues = function(dimensions)
{
	for (var i = 0; i < dimensions.size(); i++)
	{
		var dimension = dimensions.getDimensionAt(i);
		var menuItem = this.m_dimPropMenu.addNewItem().setText(oFF.XStringUtils.concatenate3(dimension.getName(), " / ", dimension.getText()));
		menuItem.registerOnPress(this);
		menuItem.setCustomObject(dimension);
		menuItem.setName(dimension.getName());
		menuItem = this.m_dimExhPropMenu.addNewItem().setText(oFF.XStringUtils.concatenate3(dimension.getName(), " / ", dimension.getText()));
		menuItem.registerOnPress(this);
		menuItem.setCustomObject(dimension);
		menuItem.setName(dimension.getName());
	}
};
oFF.DimensionDialogTestProgram.prototype.updateGrid = function()
{
	var resultSet = oFF.DimensionDialogTestProgram.getResultSet(this.m_queryManager);
	var modelJson = oFF.GridRendererFactory.createRenderer(oFF.ProtocolBindingType.SAC_TABLE_GRID).render(resultSet.getCursorResultSet());
	var resolver = oFF.GridResolverFactory.createResolver(oFF.ProtocolBindingType.SAC_TABLE_GRID);
	resolver.updateModel(resultSet, modelJson.asStructure());
	this.m_grid.setCustomObject(resolver);
	this.m_grid.setModelJson(modelJson);
};
oFF.DimensionDialogTestProgram.prototype.initializeProgram = function()
{
	oFF.DfUiProgram.prototype.initializeProgram.call( this );
	oFF.ApplicationUiModule.getInstance();
	this.m_messageManager = oFF.MessageManager.createMessageManagerExt(this.getSession());
	oFF.OlapUiValueHelpAbstract.s_syncType = oFF.SyncType.BLOCKING;
	var traceInfo = oFF.TraceInfo.create();
	traceInfo.setTraceType(oFF.TraceType.URL);
	traceInfo.setTraceName(this.m_test);
	this.getApplication().getConnectionPool().setTraceInfo(this.m_system, traceInfo);
};
oFF.DimensionDialogTestProgram.prototype.onPress = function(event)
{
	var control = event.getControl();
	var controlName = control.getName();
	var controlParentName = control.getParent().getName();
	var customObject = control.getCustomObject();
	switch (controlName)
	{
		case oFF.DimensionDialogTestProgram.LAYOUT_BTN:
			this.openLayoutDialog();
			break;

		case oFF.DimensionDialogTestProgram.CUR_CONV_BUTTON:
			this.openCurrencyDialog();
			break;

		case oFF.DimensionDialogTestProgram.DIMENSION_BTN:
			this.m_dimPropMenu.openAt(event.getControl());
			break;

		case oFF.DimensionDialogTestProgram.DIMENSION_EXH_BTN:
			this.m_dimExhPropMenu.openAt(event.getControl());
			break;

		case oFF.DimensionDialogTestProgram.SELECT_SYSTEM_BTN:
			var tmpMenu = this.m_genesis.newControl(oFF.UiType.MENU);
			tmpMenu.addNewItem().setText("Bw Sample System").setName(oFF.DimensionDialogTestProgram.SELECT_SYSTEM_BW_MENU).registerOnPress(this);
			tmpMenu.addNewItem().setText("Bw Sample System 2 Struct").setName(oFF.DimensionDialogTestProgram.SELECT_SYSTEM_BW_2STRUCTURES).registerOnPress(this);
			tmpMenu.addNewItem().setText("Gipsy with CaseSensitive Sorting").setName(oFF.DimensionDialogTestProgram.SELECT_SYSTEM_GIPSY_MENU).registerOnPress(this);
			tmpMenu.addNewItem().setText("Mds Sample System").setName(oFF.DimensionDialogTestProgram.SELECT_SYSTEM_MDS_MENU).registerOnPress(this);
			tmpMenu.addNewItem().setText("Mds Legacy CurTrans").setName(oFF.DimensionDialogTestProgram.SELECT_SYSTEM_MDS_LEGACY_CUR_TRANS).registerOnPress(this);
			tmpMenu.addNewItem().setText("Mds Account CurTrans").setName(oFF.DimensionDialogTestProgram.SELECT_SYSTEM_MDS_ACCOUNT_WITH_MD).registerOnPress(this);
			tmpMenu.addNewItem().setText("Mds Measure CurTrans").setName(oFF.DimensionDialogTestProgram.SELECT_SYSTEM_MDS_MEASURE_WITHOUT_MD).registerOnPress(this);
			tmpMenu.openAt(event.getControl());
			break;

		case oFF.DimensionDialogTestProgram.SELECT_SYSTEM_BW_MENU:
			this.m_system = "KIW";
			this.m_datasource = "query:[0BICS_C03_BICSTEST_Q0020]";
			this.fillDataSourceSeletWidgets();
			break;

		case oFF.DimensionDialogTestProgram.SELECT_SYSTEM_BW_2STRUCTURES:
			this.m_system = "KIW";
			this.m_datasource = "query:[0BICS_009_BICSTEST_Q0001]";
			this.fillDataSourceSeletWidgets();
			break;

		case oFF.DimensionDialogTestProgram.SELECT_SYSTEM_GIPSY_MENU:
			this.m_system = "gipsy";
			this.m_datasource = "view:[_SYS_BIC][mdstest.music][MUSICSALES]";
			this.fillDataSourceSeletWidgets();
			break;

		case oFF.DimensionDialogTestProgram.SELECT_SYSTEM_MDS_MENU:
			this.m_system = "apollo";
			this.m_datasource = "planning:[TENANT_TEST][][/t.TEST/ACT_ANA_income_qs]";
			this.fillDataSourceSeletWidgets();
			break;

		case oFF.DimensionDialogTestProgram.SELECT_SYSTEM_MDS_LEGACY_CUR_TRANS:
			this.m_system = "apollo";
			this.m_datasource = "sfx:[t.TEST.APDCurConv_Ext_Model:APDCurConv_Ext_Model]";
			this.fillDataSourceSeletWidgets();
			break;

		case oFF.DimensionDialogTestProgram.SELECT_SYSTEM_MDS_ACCOUNT_WITH_MD:
			this.m_system = "gipsy";
			this.m_datasource = "inamodel:[MDS_REPO][][MDS_BusinessPlanning_withAccountAndMeasureMembers]";
			this.fillDataSourceSeletWidgets();
			break;

		case oFF.DimensionDialogTestProgram.SELECT_SYSTEM_MDS_MEASURE_WITHOUT_MD:
			this.m_system = "gipsy";
			this.m_datasource = "inamodel:[MDSTEST][][AN_PAID_INVOICES_WITH_CC]";
			this.fillDataSourceSeletWidgets();
			break;

		case oFF.DimensionDialogTestProgram.QUERY_BUTTON:
			this.m_system = this.m_systemInput.getText();
			this.m_datasource = this.m_dataSourceInput.getText();
			this.doQuery();
			break;

		case "DataCellProps":
			this.doOpenDataCellDialog();
			break;

		case "DataCellProps2":
			this.doOpenDataCellDialog2();
			break;

		case oFF.DimensionDialogTestProgram.DATACELL_MENU:
			this.openDataCellDialogForMember(customObject);
			break;

		case oFF.DimensionDialogTestProgram.DIMENSION_CONTEXT_MENU:
			oFF.DdEntryPoint.createEntryPoint(this.getApplication()).openDimensionDialog(oFF.XStringUtils.concatenate3(customObject.getName(), "/", customObject.getText()), customObject, this);
			break;

		case oFF.DimensionDialogTestProgram.FILTER_CONTEXT_MENU:
			oFF.FdEntryPoint.createEntryPoint(this.getApplication(), oFF.XStringUtils.concatenate3(customObject.getName(), "/", customObject.getText())).openWithDimension(customObject, this);
			break;

		case oFF.DimensionDialogTestProgram.COLLAPSE_MENU:
			control.getCustomObject().setNextDrillState(oFF.DrillState.COLLAPSED);
			this.updateGrid();
			break;

		case oFF.DimensionDialogTestProgram.DRILL_MENU:
			control.getCustomObject().setNextDrillState(oFF.DrillState.DRILLED);
			this.updateGrid();
			break;

		case oFF.DimensionDialogTestProgram.EXPAND_MENU:
			control.getCustomObject().setNextDrillState(oFF.DrillState.EXPANDED);
			this.updateGrid();
			break;

		default:
			switch (controlParentName)
			{
				case oFF.DimensionDialogTestProgram.DIMENSION_MENU:
					oFF.DdEntryPoint.createEntryPoint(this.getApplication()).openDimensionDialog(oFF.XStringUtils.concatenate3(customObject.getName(), "/", customObject.getText()), customObject, this);
					break;

				case oFF.DimensionDialogTestProgram.DIMENSION_EXHAUSTIVE_MENU:
					oFF.DdExhaustiveEntryPoint.createEntryPoint(this.getApplication()).openDimensionDialog(oFF.XStringUtils.concatenate3(customObject.getName(), "/", customObject.getText()), customObject, this);
					break;
			}
	}
};
oFF.DimensionDialogTestProgram.prototype.m_dcController = null;
oFF.DimensionDialogTestProgram.prototype.openLayoutDialog = function()
{
	var aldOceanEntryPoint = oFF.AldEntryPoint.createEntryPoint(this.getApplication());
	aldOceanEntryPoint.openAldDialog("Axis layout", this.m_queryManager.getQueryModel(), this);
};
oFF.DimensionDialogTestProgram.prototype.openDataCellDialogForMember = function(structureMember)
{
	var displayManager = oFF.OlapUiDisplayFactory.createFactoryForDialog(this.getUiManager());
	var context = oFF.OlapUiContext.createContext(this.getUiManager(), displayManager);
	if (oFF.isNull(this.m_dcController))
	{
		this.m_dcController = oFF.DataCellController.create(context);
	}
	if (structureMember.getDimension().isMeasureStructure())
	{
		this.m_dcController.openDataCellPropertiesDialog(this, this.m_queryManager, structureMember.getName(), null, false);
	}
	else
	{
		this.m_dcController.openDataCellPropertiesDialog(this, this.m_queryManager, null, structureMember.getName(), true);
	}
};
oFF.DimensionDialogTestProgram.prototype.doOpenDataCellDialog = function()
{
	var displayManager = oFF.OlapUiDisplayFactory.createFactoryForDialog(this.getUiManager());
	var context = oFF.OlapUiContext.createContext(this.getUiManager(), displayManager);
	if (oFF.isNull(this.m_dcController))
	{
		this.m_dcController = oFF.DataCellController.create(context);
	}
	var measure1 = this.m_queryManager.getQueryModel().getMeasureDimension().getAllStructureMembers().get(0);
	this.m_dcController.openDataCellPropertiesDialog(this, this.m_queryManager, measure1.getName(), null, false);
};
oFF.DimensionDialogTestProgram.prototype.doOpenDataCellDialog2 = function()
{
	var displayManager = oFF.OlapUiDisplayFactory.createFactoryForDialog(this.getUiManager());
	var context = oFF.OlapUiContext.createContext(this.getUiManager(), displayManager);
	if (oFF.isNull(this.m_dcController))
	{
		this.m_dcController = oFF.DataCellController.create(context);
	}
	var measure1 = this.m_queryManager.getQueryModel().getMeasureDimension().getAllStructureMembers().get(0);
	var structure1 = null;
	var nonMeasureDimension = this.m_queryManager.getQueryModel().getNonMeasureDimension();
	if (oFF.notNull(nonMeasureDimension) && nonMeasureDimension.getAllStructureMembers().size() > 1)
	{
		structure1 = nonMeasureDimension.getAllStructureMembers().get(2);
	}
	this.m_dcController.openDataCellPropertiesDialog(this, this.m_queryManager, measure1.getName(), oFF.isNull(structure1) ? null : structure1.getName(), true);
};
oFF.DimensionDialogTestProgram.prototype.onDataCellOk = function()
{
	this.updateGrid();
};
oFF.DimensionDialogTestProgram.prototype.onDataCellClose = function()
{
	this.m_dcController.close();
};
oFF.DimensionDialogTestProgram.prototype.openCurrencyDialog = function()
{
	var qccEntryPoint = oFF.CtEntryPoint.createEntryPoint(this.getApplication());
	qccEntryPoint.openQCTDialog("Currency conversion", this.m_queryManager.getQueryModel().getCurrencyTranslationManager(), this);
};
oFF.DimensionDialogTestProgram.prototype.onSubmit = function()
{
	this.updateGrid();
	this.updateDimensionMenu();
};
oFF.DimensionDialogTestProgram.prototype.onClose = function() {};
oFF.DimensionDialogTestProgram.prototype.onLiveChange = function(event)
{
	this.needsQuery();
};
oFF.DimensionDialogTestProgram.prototype.needsQuery = function()
{
	this.m_dimPropMenu.setEnabled(false);
	this.m_dimExhPropMenu.setEnabled(false);
	this.m_curConvBtn.setEnabled(false);
	this.m_dimPropBtn.setEnabled(false);
	this.m_dimExhPropBtn.setEnabled(false);
	this.m_layoutBtn.setEnabled(false);
	this.m_queryButton.setEnabled(true);
};
oFF.DimensionDialogTestProgram.prototype.onClick = function(event) {};
oFF.DimensionDialogTestProgram.prototype.onContextMenu = function(event)
{
	oFF.XLogger.println(event.getControl().toString());
	var column = event.getParameters().getIntegerByKey(oFF.UiControlEvent.PARAM_COLUMN);
	var row = event.getParameters().getIntegerByKey(oFF.UiControlEvent.PARAM_ROW);
	var resolver = event.getControl().getCustomObject();
	this.m_contextMenu.clearItems();
	var menuItem = this.m_contextMenu.addNewItem();
	menuItem.setText("Layout ...");
	menuItem.setName(oFF.DimensionDialogTestProgram.LAYOUT_BTN);
	menuItem.registerOnPress(this);
	var tupleElement = resolver.getColumnTupleElement(column, row);
	if (oFF.isNull(tupleElement))
	{
		tupleElement = resolver.getRowTupleElement(column, row);
	}
	if (oFF.notNull(tupleElement))
	{
		var drillState = tupleElement.getDrillState();
		if (drillState === oFF.DrillState.COLLAPSED || drillState === oFF.DrillState.COLLAPSED_EXPAND_AND_DRILLDOWN_ALLOWED || drillState === oFF.DrillState.LEAF_UDH_EXPAND_ALLOWED)
		{
			menuItem = this.m_contextMenu.addNewItem();
			menuItem.setText("Expand node");
			menuItem.setName(oFF.DimensionDialogTestProgram.EXPAND_MENU);
			menuItem.setCustomObject(tupleElement);
			menuItem.registerOnPress(this);
		}
		if (drillState === oFF.DrillState.COLLAPSED_EXPAND_AND_DRILLDOWN_ALLOWED || drillState === oFF.DrillState.LEAF_DRILLDOWN_ALLOWED)
		{
			menuItem = this.m_contextMenu.addNewItem();
			menuItem.setText("Drill node");
			menuItem.setName(oFF.DimensionDialogTestProgram.DRILL_MENU);
			menuItem.setCustomObject(tupleElement);
			menuItem.registerOnPress(this);
		}
		if (drillState === oFF.DrillState.EXPANDED || drillState === oFF.DrillState.DRILLED || drillState === oFF.DrillState.DRILL_DOWN)
		{
			menuItem = this.m_contextMenu.addNewItem();
			menuItem.setText("Collapse node");
			menuItem.setName(oFF.DimensionDialogTestProgram.COLLAPSE_MENU);
			menuItem.setCustomObject(tupleElement);
			menuItem.registerOnPress(this);
		}
	}
	var dimension = resolver.getColumnDimension(row);
	if (oFF.isNull(dimension))
	{
		dimension = resolver.getRowDimension(column);
	}
	if (oFF.notNull(dimension))
	{
		dimension = this.m_queryManager.getQueryModel().getDimensionByName(dimension.getName());
		if (!dimension.isUniversalDisplayHierarchyDimension())
		{
			menuItem = this.m_contextMenu.addNewItem();
			menuItem.setText(oFF.XStringUtils.concatenate2("Settings for dimension ", dimension.getText()));
			menuItem.setName(oFF.DimensionDialogTestProgram.DIMENSION_CONTEXT_MENU);
			menuItem.setCustomObject(dimension);
			menuItem.registerOnPress(this);
			menuItem = this.m_contextMenu.addNewItem();
			menuItem.setText(oFF.XStringUtils.concatenate2("Filter on dimension ", dimension.getText()));
			menuItem.setName(oFF.DimensionDialogTestProgram.FILTER_CONTEXT_MENU);
			menuItem.setCustomObject(dimension);
			menuItem.registerOnPress(this);
		}
	}
	var dimensionMember;
	var i;
	var tuple = resolver.getRowTuple(row);
	var structureMember;
	if (oFF.notNull(tuple))
	{
		for (i = 0; i < tuple.size(); i++)
		{
			tupleElement = tuple.getTupleElementAt(i);
			dimensionMember = tupleElement.getDimensionMember();
			structureMember = tupleElement.getDimension().getStructureMember(dimensionMember.getName());
			if (oFF.notNull(structureMember))
			{
				menuItem = this.m_contextMenu.addNewItem();
				menuItem.setText(oFF.XStringUtils.concatenate2("Properties for ", dimensionMember.getText()));
				menuItem.setName(oFF.DimensionDialogTestProgram.DATACELL_MENU);
				menuItem.setCustomObject(structureMember);
				menuItem.registerOnPress(this);
				break;
			}
		}
	}
	tuple = resolver.getColumnTuple(column);
	if (oFF.notNull(tuple))
	{
		for (i = 0; i < tuple.size(); i++)
		{
			tupleElement = tuple.getTupleElementAt(i);
			dimensionMember = tupleElement.getDimensionMember();
			structureMember = tupleElement.getDimension().getStructureMember(dimensionMember.getName());
			if (oFF.notNull(structureMember))
			{
				menuItem = this.m_contextMenu.addNewItem();
				menuItem.setText(oFF.XStringUtils.concatenate2("Properties for ", dimensionMember.getText()));
				menuItem.setName(oFF.DimensionDialogTestProgram.DATACELL_MENU);
				menuItem.setCustomObject(structureMember);
				menuItem.registerOnPress(this);
				break;
			}
		}
	}
	var clickX = event.getParameters().getIntegerByKeyExt(oFF.UiControlEvent.PARAM_CLICK_X, 0);
	var clickY = event.getParameters().getIntegerByKeyExt(oFF.UiControlEvent.PARAM_CLICK_Y, 0);
	this.m_contextMenu.openAtPosition(clickX, clickY);
};
oFF.DimensionDialogTestProgram.prototype.onFilterDialogOk = function(selection)
{
	if (oFF.XCollectionUtils.hasElements(selection))
	{
		var member = selection.get(0).getNode().getDimensionMember();
		var dimension = member.getDimension();
		var cartesianList = this.m_queryManager.getQueryModel().getFilter().getDynamicFilter().getCartesianProductWithDefault().getCartesianListWithDefault(dimension);
		cartesianList.addNewCartesianElement().configureSingleParameterExpression(member.getFieldValue(dimension.getKeyField()).getValue(), oFF.ComparisonOperator.EQUAL);
		this.updateGrid();
	}
};
oFF.DimensionDialogTestProgram.prototype.onFilterDialogCancel = function() {};

oFF.FilterDialogProgram = function() {};
oFF.FilterDialogProgram.prototype = new oFF.DfUiProgram();
oFF.FilterDialogProgram.prototype._ff_c = "FilterDialogProgram";

oFF.FilterDialogProgram.DEFAULT_PROGRAM_NAME = "FilterDialog";
oFF.FilterDialogProgram.PARAM_SYSTEM = "system";
oFF.FilterDialogProgram.PARAM_DATASOURCE = "datasource";
oFF.FilterDialogProgram.PARAM_DIMENSION = "dimension";
oFF.FilterDialogProgram.PARAM_VARIABLE = "variable";
oFF.FilterDialogProgram.PARAM_HIERARCHY = "hierarchy";
oFF.FilterDialogProgram.PARAM_TEST = "test";
oFF.FilterDialogProgram.createRunner = function()
{
	return oFF.KernelBoot.createByName(oFF.FilterDialogProgram.DEFAULT_PROGRAM_NAME);
};
oFF.FilterDialogProgram.prototype.m_system = null;
oFF.FilterDialogProgram.prototype.m_datasource = null;
oFF.FilterDialogProgram.prototype.m_dimension = null;
oFF.FilterDialogProgram.prototype.m_variable = null;
oFF.FilterDialogProgram.prototype.m_hierarchy = null;
oFF.FilterDialogProgram.prototype.m_test = null;
oFF.FilterDialogProgram.prototype.m_programLayout = null;
oFF.FilterDialogProgram.prototype.m_featureTogglesDialog = null;
oFF.FilterDialogProgram.prototype.m_queryManager = null;
oFF.FilterDialogProgram.prototype.m_entryPoint = null;
oFF.FilterDialogProgram.prototype.m_fdOrcaEntryPoint = null;
oFF.FilterDialogProgram.prototype.releaseObject = function()
{
	oFF.DfUiProgram.prototype.releaseObject.call( this );
	this.m_system = null;
	this.m_datasource = null;
	this.m_dimension = null;
	this.m_variable = null;
	this.m_hierarchy = null;
	this.m_test = null;
	this.m_queryManager = oFF.XObjectExt.release(this.m_queryManager);
	this.m_entryPoint = oFF.XObjectExt.release(this.m_entryPoint);
	this.m_featureTogglesDialog = oFF.XObjectExt.release(this.m_featureTogglesDialog);
	this.m_programLayout = oFF.XObjectExt.release(this.m_programLayout);
	this.m_fdOrcaEntryPoint = oFF.XObjectExt.release(this.m_fdOrcaEntryPoint);
};
oFF.FilterDialogProgram.prototype.newProgram = function()
{
	var filterDialogProgram = new oFF.FilterDialogProgram();
	filterDialogProgram.setup();
	return filterDialogProgram;
};
oFF.FilterDialogProgram.prototype.doSetupProgramMetadata = function(metadata)
{
	oFF.DfUiProgram.prototype.doSetupProgramMetadata.call( this , metadata);
	metadata.addParameter(oFF.FilterDialogProgram.PARAM_SYSTEM, "The system to connect to.");
	metadata.addParameter(oFF.FilterDialogProgram.PARAM_DATASOURCE, "The datasource to be used (Can be empty for planning sequences).");
	metadata.addParameter(oFF.FilterDialogProgram.PARAM_DIMENSION, "The dimension to be used.");
	metadata.addParameter(oFF.FilterDialogProgram.PARAM_VARIABLE, "The variable to be used.");
	metadata.addParameter(oFF.FilterDialogProgram.PARAM_HIERARCHY, "The hierarchy to used.");
	metadata.addParameter(oFF.FilterDialogProgram.PARAM_TEST, "The name of the running test (Optional).");
};
oFF.FilterDialogProgram.prototype.evalArguments = function()
{
	var argumentStructure = this.getArgumentStructure();
	if (argumentStructure.getIntegerByKeyExt(oFF.DfProgram.PARAM_XVERSION, -1) === -1)
	{
		argumentStructure.putInteger(oFF.DfProgram.PARAM_XVERSION, oFF.XVersion.V124_INIT_ACTION_FOR_FUSION);
	}
	oFF.DfUiProgram.prototype.evalArguments.call( this );
	this.m_system = this.getParameterValue(oFF.FilterDialogProgram.PARAM_SYSTEM);
	this.m_datasource = this.getParameterValue(oFF.FilterDialogProgram.PARAM_DATASOURCE);
	this.m_dimension = this.getParameterValue(oFF.FilterDialogProgram.PARAM_DIMENSION);
	this.m_variable = this.getParameterValue(oFF.FilterDialogProgram.PARAM_VARIABLE);
	this.m_hierarchy = this.getParameterValue(oFF.FilterDialogProgram.PARAM_HIERARCHY);
	this.m_test = this.getParameterValue(oFF.FilterDialogProgram.PARAM_TEST);
	if (oFF.XStringUtils.isNullOrEmpty(this.m_system) || oFF.XStringUtils.isNullOrEmpty(this.m_datasource))
	{
		this.m_system = "KIW";
		this.m_datasource = "query:[0BOC_TEST_VARIABLE_TYPES_1]";
		this.m_dimension = "0BC_CUST";
		this.m_variable = null;
		this.m_hierarchy = null;
	}
};
oFF.FilterDialogProgram.prototype.getParameterValue = function(name)
{
	var value = this.getSession().getEnvironment().getStringByKey(name);
	return oFF.XStringUtils.isNotNullAndNotEmpty(value) ? value : this.getArgumentStructure().getStringByKey(name);
};
oFF.FilterDialogProgram.prototype.initializeProgram = function()
{
	oFF.DfUiProgram.prototype.initializeProgram.call( this );
	oFF.ApplicationUiModule.getInstance();
	var traceInfo = oFF.TraceInfo.create();
	traceInfo.setTraceType(oFF.TraceType.URL);
	traceInfo.setTraceName(this.m_test);
	this.getApplication().getConnectionPool().setTraceInfo(this.m_system, traceInfo);
};
oFF.FilterDialogProgram.prototype.isShowMenuBar = function()
{
	return true;
};
oFF.FilterDialogProgram.prototype.buildUi = function(genesis)
{
	oFF.DfUiProgram.prototype.buildUi.call( this , genesis);
	this.m_programLayout = oFF.FilterDialogProgramLayout.create(genesis, this.getMenuBar(), this, this);
	this.setupQueryManager();
};
oFF.FilterDialogProgram.prototype.setupQueryManager = function()
{
	this.m_programLayout.showActivityIndicator();
	this.m_queryManager = oFF.XObjectExt.release(this.m_queryManager);
	var serviceConfig = oFF.QueryServiceConfig.createWithDataSourceName(this.getApplication(), this.m_system, this.m_datasource);
	serviceConfig.processQueryManagerCreation(oFF.SyncType.NON_BLOCKING, this, null);
};
oFF.FilterDialogProgram.prototype.onQueryManagerCreated = function(extResult, queryManager, customIdentifier)
{
	if (extResult.hasErrors())
	{
		this.m_programLayout.showChangeDataSourceButton();
		this.m_programLayout.showErrorToast(extResult.getSummary());
		return;
	}
	this.m_queryManager = extResult.getData();
	this.m_programLayout.showUi(queryManager, oFF.XStringUtils.concatenate3(this.m_system, " - ", this.m_datasource), this.m_dimension, this.m_hierarchy, this.m_variable);
	this.m_dimension = this.m_programLayout.getDimensionDropdown().getSelectedName();
	this.m_variable = this.m_programLayout.getVariableDropdown().getSelectedName();
};
oFF.FilterDialogProgram.prototype.onSelect = function(event)
{
	this.m_programLayout.getSelectionTextArea().setText(null);
	this.m_programLayout.getOutputTextArea().setText(null);
	if (event.getControl() === this.m_programLayout.getDimensionDropdown())
	{
		this.m_dimension = this.m_programLayout.getDimensionDropdown().getSelectedItem().getText();
		var dimension = this.m_queryManager.getDimensionAccessor().getDimensionByName(this.m_dimension);
		this.m_programLayout.getHierarchyInput().setText(oFF.notNull(dimension) ? dimension.getHierarchyName() : null);
	}
	else if (event.getControl() === this.m_programLayout.getVariableDropdown())
	{
		this.m_variable = this.m_programLayout.getVariableDropdown().getSelectedItem().getText();
	}
};
oFF.FilterDialogProgram.prototype.onPress = function(event)
{
	var control = event.getControl();
	if (control === this.m_programLayout.getOpenFilterDialogBtn())
	{
		this.openFilterDialog();
	}
	else if (control === this.m_programLayout.getChangeDataSourceBtn())
	{
		this.openDataSourceDialog();
	}
	else if (control === this.m_programLayout.getFeatureTogglesBtn())
	{
		this.openFeatureTogglesDialog();
	}
	else if (control === this.m_programLayout.getSetVariablesBtn())
	{
		oFF.VdUqmEntryPoint.createEntryPoint("Set Variables", this.m_queryManager.getVariableProcessor(), this).open();
	}
};
oFF.FilterDialogProgram.prototype.openFilterDialog = function()
{
	oFF.OlapUiValueHelpAbstract.s_syncType = this.m_programLayout.getNonBlockingCheckbox().isChecked() ? oFF.SyncType.NON_BLOCKING : oFF.SyncType.BLOCKING;
	this.m_entryPoint = oFF.XObjectExt.release(this.m_entryPoint);
	if (this.m_programLayout.getDataObjectDimensionRadioBtn().isSelected() && this.m_queryManager.hasVariables() && this.m_queryManager.isSubmitNeeded())
	{
		this.m_queryManager.submitVariables(oFF.SyncType.BLOCKING, null, null);
	}
	else if (this.m_programLayout.getDataObjectVariableRadioBtn().isSelected() && !this.m_programLayout.getEntryPointSacRadioBtn().isSelected() && this.m_queryManager.isReinitNeeded())
	{
		this.m_queryManager.reInitVariablesAfterSubmit(oFF.SyncType.BLOCKING, null, null);
	}
	if (this.m_programLayout.getEntryPointDefaultRadioBtn().isSelected())
	{
		var selectedItems = oFF.XList.create();
		var selectionText = this.m_programLayout.getSelectionTextArea().getText();
		if (oFF.XStringUtils.isNotNullAndNotEmpty(selectionText))
		{
			var selectedValues = oFF.XStringTokenizer.splitString(selectionText, ",");
			for (var i = 0; i < selectedValues.size(); i++)
			{
				selectedItems.add(oFF.FdItemFactory.createItemByKey(null, oFF.XString.trim(selectedValues.get(i)), null));
			}
		}
		this.openFilterDialogWithFdEntryPoint(selectedItems);
	}
	else if (this.m_programLayout.getEntryPointSacRadioBtn().isSelected())
	{
		this.openFilterDialogWithFdOrcaEntryPoint();
	}
};
oFF.FilterDialogProgram.prototype.openFilterDialogWithFdEntryPoint = function(selectedItems)
{
	this.m_entryPoint = oFF.FdEntryPoint.createEntryPoint(this.getApplication(), "Filter Dialog");
	this.m_entryPoint.setFeatureToggleProvider(this);
	var config = this.m_entryPoint.getConfiguration();
	config.setMultiSelection(this.m_programLayout.getMultiSelectionModeCheckbox().isChecked());
	config.setSelection(selectedItems);
	config.setDimensionDisplayInfo(this.m_programLayout.getDisplayInfoDropdown().getSelectedItem().getCustomObject());
	config.setPageSize(oFF.XInteger.convertFromStringWithDefault(this.m_programLayout.getPageSizeInput().getText(), oFF.FdConfiguration.DEFAULT_PAGE_SIZE));
	config.setFunctionalValuesEnabled(true);
	if (this.m_programLayout.getDataObjectDimensionRadioBtn().isSelected())
	{
		var dimension = this.getSelectedDimension();
		if (oFF.notNull(dimension))
		{
			if (this.m_programLayout.getUseDynamicFilterCheckbox().isChecked())
			{
				this.m_entryPoint.openWithDynamicFilter(dimension, this);
			}
			else
			{
				this.m_entryPoint.openWithDimension(dimension, this);
			}
		}
	}
	else if (this.m_programLayout.getDataObjectVariableRadioBtn().isSelected())
	{
		var variable = this.getSelectedVariable();
		if (oFF.notNull(variable))
		{
			this.m_entryPoint.openWithVariable(variable, this);
		}
	}
};
oFF.FilterDialogProgram.prototype.getSelectedDimension = function()
{
	var selectedDimension = this.m_programLayout.getDimensionDropdown().getSelectedItem();
	var dimension = oFF.notNull(selectedDimension) ? this.m_queryManager.getDimensionAccessor().getDimensionByName(selectedDimension.getText()) : null;
	if (oFF.isNull(dimension))
	{
		this.m_programLayout.showErrorToast("Invalid dimension");
		return null;
	}
	var hierarchy = this.m_programLayout.getHierarchyInput().getText();
	if (oFF.XStringUtils.isNotNullAndNotEmpty(hierarchy))
	{
		dimension.setHierarchyName(hierarchy);
		dimension.setHierarchyActive(true);
	}
	else if (dimension.supportsHierarchy())
	{
		dimension.setHierarchyActive(false);
	}
	return dimension;
};
oFF.FilterDialogProgram.prototype.getSelectedVariable = function()
{
	var selectedVariable = this.m_programLayout.getVariableDropdown().getSelectedItem();
	var variable = oFF.notNull(selectedVariable) ? this.m_queryManager.getVariable(selectedVariable.getText()) : null;
	if (oFF.isNull(variable))
	{
		this.m_programLayout.showErrorToast("Invalid variable");
		return null;
	}
	return variable;
};
oFF.FilterDialogProgram.prototype.openFilterDialogWithFdOrcaEntryPoint = function()
{
	if (this.m_programLayout.getDataObjectDimensionRadioBtn().isSelected())
	{
		this.m_programLayout.showErrorToast("Opening filter dialog for dimension with SAC entry point is not yet supported");
	}
	else if (this.m_programLayout.getDataObjectVariableRadioBtn().isSelected())
	{
		var variable = this.getSelectedVariable();
		if (oFF.notNull(variable))
		{
			if (oFF.isNull(this.m_fdOrcaEntryPoint))
			{
				this.m_fdOrcaEntryPoint = oFF.FdOrcaEntryPoint.create(this.getApplication(), null, oFF.GyrosNumberFormatter.create(), this, null);
			}
			this.m_fdOrcaEntryPoint.prepareVariableProcessorState(variable, this);
		}
	}
};
oFF.FilterDialogProgram.prototype.onVariableProcessorExecuted = function(extResult, result, customIdentifier)
{
	var selectedDataAsJson;
	try
	{
		var selectedData = this.m_programLayout.getSelectionTextArea().getText();
		selectedDataAsJson = oFF.XStringUtils.isNotNullAndNotEmpty(selectedData) ? oFF.JsonParserFactory.createFromString(selectedData).asStructure() : null;
	}
	catch (e)
	{
		this.m_programLayout.showErrorToast("Json is not a valid structure");
		return;
	}
	if (!this.m_fdOrcaEntryPoint.openForVariable(this.getSelectedVariable(), selectedDataAsJson, this))
	{
		this.m_programLayout.showErrorToast("Opening the dialog failed");
	}
};
oFF.FilterDialogProgram.prototype.isActive = function(text)
{
	if (oFF.XString.isEqual(text, oFF.OlapUiFeatureToggle.MEMBERSELECTOR_READMODE_SWITCH))
	{
		return this.m_programLayout.getFeatureToggleReadMode().isChecked();
	}
	return true;
};
oFF.FilterDialogProgram.prototype.onOk = function() {};
oFF.FilterDialogProgram.prototype.onCancel = function() {};
oFF.FilterDialogProgram.prototype.openDataSourceDialog = function()
{
	var appStoreDlgManifest = oFF.ProgramRegistration.getProgramManifest(oFF.AuDatasourcePicker.DEFAULT_PROGRAM_NAME);
	var appStoreDlgStartCfg = oFF.ProgramStartCfg.create(this.getProcess(), appStoreDlgManifest.getName(), null, null);
	var tmpArgs = appStoreDlgStartCfg.getArguments();
	tmpArgs.getArgumentStructure().putString(oFF.AuDatasourcePicker.PARAM_SYSTEM, this.m_system);
	tmpArgs.putXObject(oFF.AuDatasourcePicker.PARAM_LISTENER, this);
	appStoreDlgStartCfg.setParentProcess(this.getProcess());
	appStoreDlgStartCfg.setIsCreatingChildProcess(true);
	appStoreDlgStartCfg.processExecution(oFF.SyncType.NON_BLOCKING, null, null);
};
oFF.FilterDialogProgram.prototype.onDatasourceSelected = function(dataSource)
{
	if (oFF.notNull(dataSource))
	{
		this.m_system = dataSource.getSystemName();
		this.m_datasource = dataSource.getFullQualifiedName();
		this.setupQueryManager();
	}
};
oFF.FilterDialogProgram.prototype.openFeatureTogglesDialog = function()
{
	oFF.XObjectExt.release(this.m_featureTogglesDialog);
	this.m_featureTogglesDialog = oFF.UiFeatureToggleDialog.createFeatureDialog(this.getSession(), this.getUiManager(), this);
	this.m_featureTogglesDialog.open();
};
oFF.FilterDialogProgram.prototype.onFeatureToggleDialogClose = function(selectedToggles)
{
	if (oFF.notNull(selectedToggles))
	{
		var session = this.getSession();
		session.clearAllFeatureToggles();
		session.activateFeatureToggleSet(selectedToggles);
		this.setupQueryManager();
	}
};
oFF.FilterDialogProgram.prototype.onFilterDialogOk = function(selection)
{
	var varMemberFilter = null;
	if (this.m_programLayout.getDataObjectVariableRadioBtn().isSelected() && this.getSelectedVariable() !== null)
	{
		varMemberFilter = this.getSelectedVariable().getMemberFilter();
		varMemberFilter.clear();
	}
	var selectedDisplayKeys = oFF.XStringBuffer.create();
	var outputText = "No elements selected";
	if (oFF.XCollectionUtils.hasElements(selection))
	{
		var output = oFF.XStringBuffer.create();
		for (var i = 0; i < selection.size(); i++)
		{
			if (i > 0)
			{
				selectedDisplayKeys.append(",");
				output.appendNewLine();
			}
			var item = selection.get(i);
			var displayKey = item.getDisplayKey();
			var text = item.getText();
			selectedDisplayKeys.append(displayKey);
			output.append(displayKey);
			output.append(" - ");
			output.append(text);
			if (oFF.notNull(varMemberFilter))
			{
				varMemberFilter.addNewCartesianElement().getLow().setString(item.getKey());
			}
		}
		outputText = output.toString();
	}
	this.m_programLayout.getSelectionTextArea().setText(selectedDisplayKeys.toString());
	this.m_programLayout.getOutputTextArea().setText(outputText);
};
oFF.FilterDialogProgram.prototype.onFilterDialogCancel = function()
{
	this.m_programLayout.getOutputTextArea().setText("Selection canceled");
};
oFF.FilterDialogProgram.prototype.onOrcaFilterDialogOk = function(selection)
{
	var parsedResult = oFF.JsonParserFactory.createFromString(selection).asStructure();
	var prettyPrintedSelection = oFF.PrUtils.serialize(parsedResult, false, true, 2);
	this.m_programLayout.getSelectionTextArea().setText(selection);
	this.m_programLayout.getOutputTextArea().setText(oFF.XStringUtils.concatenate2("Selection changed:\n\n", prettyPrintedSelection));
	if (this.m_programLayout.getDataObjectVariableRadioBtn().isSelected() && this.getSelectedVariable() !== null)
	{
		var varMemberFilter = this.getSelectedVariable().getMemberFilter();
		varMemberFilter.clear();
		var selectedData = parsedResult.getListByKey(oFF.OrcaConstants.SELECTED_DATA);
		for (var i = 0; i < selectedData.size(); i++)
		{
			var selectedKey = selectedData.getStructureAt(i).getStringByKey(oFF.OrcaConstants.NAME);
			varMemberFilter.addNewCartesianElement().getLow().setString(selectedKey);
		}
	}
};
oFF.FilterDialogProgram.prototype.onOrcaFilterDialogCancel = function()
{
	this.m_programLayout.getOutputTextArea().setText("Selection canceled");
};
oFF.FilterDialogProgram.prototype.onFilterUpdated = function(filterChanged)
{
	var output = oFF.XStringBuffer.create();
	output.append(filterChanged ? "Filter changed:" : "Filter has not been changed:").appendNewLine();
	var selectedDimension = this.m_programLayout.getDimensionDropdown().getSelectedItem();
	var dimension = oFF.notNull(selectedDimension) ? this.m_queryManager.getDimensionAccessor().getDimensionByName(selectedDimension.getText()) : null;
	if (oFF.notNull(dimension))
	{
		var filter = dimension.getFilter();
		if (oFF.notNull(filter))
		{
			output.appendNewLine().append(filter.serializeToString(oFF.QModelFormat.INA_DATA));
		}
		else
		{
			output.append("No filter set for dimension");
		}
	}
	else
	{
		output.append("Invalid dimension");
	}
	this.m_programLayout.getSelectionTextArea().setText(null);
	this.m_programLayout.getOutputTextArea().setText(output.toString());
};

oFF.GsGalaxyStudio = function() {};
oFF.GsGalaxyStudio.prototype = new oFF.DfUiProgram();
oFF.GsGalaxyStudio.prototype._ff_c = "GsGalaxyStudio";

oFF.GsGalaxyStudio.DEFAULT_PROGRAM_NAME = "GalaxyStudio";
oFF.GsGalaxyStudio.ACTION_BAR_ITEM_SPACING = "10px";
oFF.GsGalaxyStudio.RECENT_FILES_SEPARATOR = ",";
oFF.GsGalaxyStudio.GALAXY_RECENT_FILES_KEY = "galaxy_recentFiles";
oFF.GsGalaxyStudio.createRunner = function()
{
	var runner = oFF.KernelBoot.createByName(oFF.GsGalaxyStudio.DEFAULT_PROGRAM_NAME);
	return runner;
};
oFF.GsGalaxyStudio.createNewVulcan = function()
{
	var prg = new oFF.GsGalaxyStudio();
	prg.setup();
	return prg;
};
oFF.GsGalaxyStudio.prototype.m_file = null;
oFF.GsGalaxyStudio.prototype.m_mainLayout = null;
oFF.GsGalaxyStudio.prototype.m_runActionBarBtn = null;
oFF.GsGalaxyStudio.prototype.m_stopActionBarBtn = null;
oFF.GsGalaxyStudio.prototype.m_splitActionBarBtn = null;
oFF.GsGalaxyStudio.prototype.m_codeEditor = null;
oFF.GsGalaxyStudio.prototype.m_appContainerWrapper = null;
oFF.GsGalaxyStudio.prototype.m_appContainer = null;
oFF.GsGalaxyStudio.prototype.m_quasarEngine = null;
oFF.GsGalaxyStudio.prototype.m_quasarEngineGenesis = null;
oFF.GsGalaxyStudio.prototype.m_recentFiles = null;
oFF.GsGalaxyStudio.prototype.newProgram = function()
{
	var prg = new oFF.GsGalaxyStudio();
	prg.setup();
	return prg;
};
oFF.GsGalaxyStudio.prototype.doSetupProgramMetadata = function(metadata)
{
	oFF.DfUiProgram.prototype.doSetupProgramMetadata.call( this , metadata);
	metadata.addOption(oFF.DfProgram.PARAM_FILE, "Specify the file to open", "Path to the file ", oFF.XValueType.STRING);
};
oFF.GsGalaxyStudio.prototype.evalArguments = function()
{
	oFF.DfUiProgram.prototype.evalArguments.call( this );
	var argStruct = this.getArgumentStructure();
	var fileName = argStruct.getStringByKey(oFF.DfProgram.PARAM_FILE);
	if (oFF.XStringUtils.isNotNullAndNotEmpty(fileName) === true)
	{
		this.openFileByPath(fileName);
	}
};
oFF.GsGalaxyStudio.prototype.initializeProgram = function()
{
	oFF.DfUiProgram.prototype.initializeProgram.call( this );
	this.setupInternal();
};
oFF.GsGalaxyStudio.prototype.releaseObject = function()
{
	oFF.DfUiProgram.prototype.releaseObject.call( this );
	this.m_file = null;
	this.m_recentFiles = oFF.XObjectExt.release(this.m_recentFiles);
	this.m_runActionBarBtn = oFF.XObjectExt.release(this.m_runActionBarBtn);
	this.m_stopActionBarBtn = oFF.XObjectExt.release(this.m_stopActionBarBtn);
	this.m_splitActionBarBtn = oFF.XObjectExt.release(this.m_splitActionBarBtn);
	this.m_appContainer = oFF.XObjectExt.release(this.m_appContainer);
	this.m_appContainerWrapper = oFF.XObjectExt.release(this.m_appContainerWrapper);
	this.m_codeEditor = oFF.XObjectExt.release(this.m_codeEditor);
	this.m_mainLayout = oFF.XObjectExt.release(this.m_mainLayout);
	this.m_quasarEngineGenesis = oFF.XObjectExt.release(this.m_quasarEngineGenesis);
	this.m_quasarEngine = oFF.XObjectExt.release(this.m_quasarEngine);
};
oFF.GsGalaxyStudio.prototype.getLogSeverity = function()
{
	return oFF.DfUiProgram.prototype.getLogSeverity.call( this );
};
oFF.GsGalaxyStudio.prototype.isShowMenuBar = function()
{
	return true;
};
oFF.GsGalaxyStudio.prototype.getDefaultWindowSize = function()
{
	return oFF.UiSizeValue.createByCss("70vw", "70vh");
};
oFF.GsGalaxyStudio.prototype.getDefaultProgramName = function()
{
	return oFF.GsGalaxyStudio.DEFAULT_PROGRAM_NAME;
};
oFF.GsGalaxyStudio.prototype.setupInternal = function()
{
	this.initSettings();
};
oFF.GsGalaxyStudio.prototype.buildUi = function(genesis)
{
	oFF.DfUiProgram.prototype.buildUi.call( this , genesis);
	this.m_mainLayout = genesis.newControl(oFF.UiType.FLEX_LAYOUT);
	this.m_mainLayout.setName("gsMainLayout");
	this.m_mainLayout.useMaxSpace();
	this.m_mainLayout.setDirection(oFF.UiFlexDirection.COLUMN);
	this.m_mainLayout.setWrap(oFF.UiFlexWrap.NO_WRAP);
	this.createHeaderToolbar(this.m_mainLayout);
	var viewLayout = this.m_mainLayout.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	viewLayout.setName("gsViewLayout");
	viewLayout.useMaxSpace();
	viewLayout.setDirection(oFF.UiFlexDirection.ROW);
	viewLayout.setAlignItems(oFF.UiFlexAlignItems.CENTER);
	viewLayout.setJustifyContent(oFF.UiFlexJustifyContent.CENTER);
	viewLayout.setWrap(oFF.UiFlexWrap.NO_WRAP);
	this.m_codeEditor = viewLayout.addNewItemOfType(oFF.UiType.CODE_EDITOR);
	this.m_codeEditor.useMaxHeight();
	this.m_codeEditor.setWidthCss("100%");
	this.m_codeEditor.setCodeType("json");
	this.m_codeEditor.registerOnLiveChange(this);
	this.m_codeEditor.registerOnFileDrop(this);
	this.m_codeEditor.setDebounceTime(2000);
	this.m_codeEditor.focus();
	this.m_appContainerWrapper = viewLayout.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	this.m_appContainerWrapper.useMaxSpace();
	this.m_appContainerWrapper.setDirection(oFF.UiFlexDirection.ROW);
	this.m_appContainerWrapper.setVisible(false);
	var codeEditorQuasarSpacer = this.m_appContainerWrapper.addNewItemOfType(oFF.UiType.SPACER);
	codeEditorQuasarSpacer.useMaxHeight();
	codeEditorQuasarSpacer.setWidthCss("3px");
	codeEditorQuasarSpacer.setBackgroundColor(oFF.UiColor.createByString("#A8AAAA"));
	this.m_appContainer = this.m_appContainerWrapper.addNewItemOfType(oFF.UiType.SCROLL_CONTAINER);
	this.m_appContainer.useMaxHeight();
	this.m_appContainer.setWidthCss("100%");
	this.createNotRunningContent(this.m_appContainer);
	genesis.setRoot(this.m_mainLayout);
	this.addMenuBarButton("gsFileToolbarBtn", null, "File", null, this);
	this.addMenuBarButton("gsToolsToolbarBtn", null, "Tools", null, this).setEnabled(false);
	this.addMenuBarButton("gsToolbarHelpBtn", null, "Help", "hint", this);
	this.updateEditorStatus();
};
oFF.GsGalaxyStudio.prototype.createHeaderToolbar = function(mainLayout)
{
	var headerToolbar = mainLayout.addNewItemOfType(oFF.UiType.TOOLBAR);
	headerToolbar.setName("headerToolbar");
	headerToolbar.setWidthCss("100%");
	headerToolbar.setHeightCss("40px");
	headerToolbar.setPaddingCss("0px");
	var headerToolbarLayout = headerToolbar.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	headerToolbarLayout.setName("headerToolbarLayout");
	headerToolbarLayout.useMaxSpace();
	headerToolbarLayout.setAlignItems(oFF.UiFlexAlignItems.CENTER);
	headerToolbarLayout.setBackgroundColor(oFF.UiColor.WHITE);
	this.m_runActionBarBtn = headerToolbarLayout.addNewItemOfType(oFF.UiType.TOGGLE_BUTTON);
	this.m_runActionBarBtn.setName("runActionBarBtn");
	this.m_runActionBarBtn.setIcon("media-play");
	this.m_runActionBarBtn.registerOnPress(this);
	var playStopSpacer = headerToolbarLayout.addNewItemOfType(oFF.UiType.SPACER);
	playStopSpacer.setWidthCss(oFF.GsGalaxyStudio.ACTION_BAR_ITEM_SPACING);
	this.m_stopActionBarBtn = headerToolbarLayout.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_stopActionBarBtn.setName("stopActionBarBtn");
	this.m_stopActionBarBtn.setIcon("stop");
	this.m_stopActionBarBtn.registerOnPress(this);
	var viewSection1 = headerToolbarLayout.addNewItemOfType(oFF.UiType.SPACER);
	viewSection1.setWidthCss(oFF.GsGalaxyStudio.ACTION_BAR_ITEM_SPACING);
	var viewSectionSeprarator = headerToolbarLayout.addNewItemOfType(oFF.UiType.SPACER);
	viewSectionSeprarator.setWidthCss("1px");
	viewSectionSeprarator.setHeightCss("60%");
	viewSectionSeprarator.setBackgroundColor(oFF.UiColor.createByString("#A8AAAA"));
	var viewSection2 = headerToolbarLayout.addNewItemOfType(oFF.UiType.SPACER);
	viewSection2.setWidthCss(oFF.GsGalaxyStudio.ACTION_BAR_ITEM_SPACING);
	this.m_splitActionBarBtn = headerToolbarLayout.addNewItemOfType(oFF.UiType.TOGGLE_BUTTON);
	this.m_splitActionBarBtn.setName("splitActionBarTglBtn");
	this.m_splitActionBarBtn.setIcon("screen-split-two");
	this.m_splitActionBarBtn.registerOnPress(this);
};
oFF.GsGalaxyStudio.prototype.createNotRunningContent = function(appContainer)
{
	var wrapperLayout = appContainer.setNewContent(oFF.UiType.FLEX_LAYOUT);
	wrapperLayout.useMaxSpace();
	wrapperLayout.setAlignItems(oFF.UiFlexAlignItems.CENTER);
	wrapperLayout.setJustifyContent(oFF.UiFlexJustifyContent.CENTER);
	var notRunningLbl = wrapperLayout.addNewItemOfType(oFF.UiType.LABEL);
	notRunningLbl.setText("Not running...");
	notRunningLbl.setFontSizeCss("18px");
	notRunningLbl.setMarginCss("20px");
};
oFF.GsGalaxyStudio.prototype.openFileByPath = function(filePath)
{
	if (oFF.notNull(filePath))
	{
		var session = this.getSession();
		var file = oFF.XFile.createExt(session, filePath, oFF.PathFormat.AUTO_DETECT, oFF.VarResolveMode.DOLLAR);
		if (oFF.isNull(file) || file.isExisting() === false)
		{
			this.log2("File does not exist: ", filePath);
			return;
		}
		this.setFile(file);
	}
};
oFF.GsGalaxyStudio.prototype.initSettings = function()
{
	if (this.getProcess() !== null)
	{
		var recentItemsStr = this.getProcess().getUserManager().getUserSettings().getStringByKeyExt(oFF.GsGalaxyStudio.GALAXY_RECENT_FILES_KEY, "");
		if (oFF.XStringUtils.isNotNullAndNotEmpty(recentItemsStr))
		{
			this.m_recentFiles = oFF.XStringTokenizer.splitString(recentItemsStr, oFF.GsGalaxyStudio.RECENT_FILES_SEPARATOR);
		}
		else
		{
			this.m_recentFiles = oFF.XListOfString.create();
		}
	}
};
oFF.GsGalaxyStudio.prototype.updateEditorStatus = function()
{
	if (oFF.notNull(this.m_file))
	{
		this.loadFileContent(this.m_file);
		this.setTitle(this.m_file.getName());
	}
	else
	{
		this.setTitle("untitled");
	}
};
oFF.GsGalaxyStudio.prototype.setFile = function(file)
{
	this.m_file = file;
	this.loadFileContent(file);
};
oFF.GsGalaxyStudio.prototype.loadFileContent = function(file)
{
	if (oFF.notNull(file) && file.isExisting() && oFF.notNull(this.m_codeEditor))
	{
		file.processLoad(oFF.SyncType.NON_BLOCKING, this, null, oFF.CompressionType.NONE);
	}
	return null;
};
oFF.GsGalaxyStudio.prototype.showAppContainer = function(show)
{
	if (oFF.notNull(this.m_appContainerWrapper))
	{
		this.m_appContainerWrapper.setVisible(show);
		this.m_splitActionBarBtn.setPressed(show);
	}
};
oFF.GsGalaxyStudio.prototype.addRecentFileToUserSettings = function(file)
{
	if (oFF.notNull(file))
	{
		var filePathStr = file.getVfsUri().getUrl();
		var recentItemsStr = this.getProcess().getUserManager().getUserSettings().getStringByKeyExt(oFF.GsGalaxyStudio.GALAXY_RECENT_FILES_KEY, "");
		if (!oFF.XStringUtils.containsString(recentItemsStr, filePathStr, true))
		{
			if (oFF.XStringUtils.isNotNullAndNotEmpty(recentItemsStr))
			{
				recentItemsStr = oFF.XStringUtils.concatenate3(recentItemsStr, oFF.GsGalaxyStudio.RECENT_FILES_SEPARATOR, filePathStr);
			}
			else
			{
				recentItemsStr = filePathStr;
			}
			this.getProcess().getUserManager().getUserSettings().putString(oFF.GsGalaxyStudio.GALAXY_RECENT_FILES_KEY, recentItemsStr);
			if (oFF.notNull(this.m_recentFiles))
			{
				this.m_recentFiles.add(filePathStr);
			}
		}
	}
};
oFF.GsGalaxyStudio.prototype.executeApp = function(docStr)
{
	if (oFF.isNull(this.m_quasarEngine))
	{
		this.m_quasarEngine = oFF.QuasarEngine.create(this.getApplication());
	}
	if (oFF.isNull(this.m_quasarEngineGenesis))
	{
		this.m_quasarEngineGenesis = oFF.UiGenesis.create(this.m_appContainer, oFF.UiPosition.CONTENT, oFF.UiOperation.SET, 0, 0);
	}
	if (oFF.XStringUtils.isNotNullAndNotEmpty(docStr))
	{
		var parser = oFF.JsonParserFactory.newInstance();
		var jsonContent = parser.parse(docStr);
		if (oFF.notNull(jsonContent))
		{
			if (parser.hasErrors())
			{
				this.m_genesis.showErrorToast("Document is not a quasar document!");
				this.m_runActionBarBtn.setPressed(false);
			}
			else
			{
				oFF.XObjectExt.release(parser);
				if (jsonContent.isStructure())
				{
					this.showAppContainer(true);
					this.m_runActionBarBtn.setPressed(true);
					this.m_quasarEngine.reset();
					this.m_quasarEngine.setDocument(jsonContent);
					this.m_quasarEngine.renderUi(this.m_quasarEngineGenesis);
				}
			}
		}
		else
		{
			this.m_genesis.showErrorToast("Document is not a json!");
			this.m_runActionBarBtn.setPressed(false);
		}
	}
	else
	{
		this.m_genesis.showErrorToast("Document is empty!");
		this.m_runActionBarBtn.setPressed(false);
	}
};
oFF.GsGalaxyStudio.prototype.stopExecution = function()
{
	if (oFF.notNull(this.m_quasarEngine))
	{
		this.m_quasarEngine = oFF.XObjectExt.release(this.m_quasarEngine);
	}
	if (oFF.notNull(this.m_quasarEngineGenesis))
	{
		this.m_quasarEngineGenesis = oFF.XObjectExt.release(this.m_quasarEngineGenesis);
	}
	this.createNotRunningContent(this.m_appContainer);
	this.m_runActionBarBtn.setPressed(false);
};
oFF.GsGalaxyStudio.prototype.isRunning = function()
{
	return this.m_runActionBarBtn.isPressed() && oFF.notNull(this.m_quasarEngine) && oFF.notNull(this.m_appContainerWrapper);
};
oFF.GsGalaxyStudio.prototype.createFileToolbarMenu = function(fileBtn)
{
	var fileToolbarMenu = this.m_genesis.newControl(oFF.UiType.MENU);
	fileToolbarMenu.setName("gsFileToolbarMenu");
	fileToolbarMenu.addNewItem().setName("gsToolbarMenuNew").setText("New").setIcon("document").registerOnPress(this);
	fileToolbarMenu.addNewItem().setName("gsToolbarMenuOpen").setText("Open").setIcon("open-folder").registerOnPress(this).setEnabled(false);
	var recentFilesMenuItem = fileToolbarMenu.addNewItem().setName("gsToolbarMenuRecent").setText("Recent").setIcon("history").registerOnPress(this);
	fileToolbarMenu.addNewItem().setName("gsToolbarMenuSave").setText("Save").setIcon("save").registerOnPress(this).setSectionStart(true).setEnabled(false);
	fileToolbarMenu.addNewItem().setName("gsToolbarMenuSaveAs").setText("Save as...").setIcon("save").registerOnPress(this).setEnabled(false);
	this.createRecentFilesMenu(recentFilesMenuItem);
	fileToolbarMenu.openAt(fileBtn);
};
oFF.GsGalaxyStudio.prototype.createToolsToolbarMenu = function(toolsBtn)
{
	var toolsToolbarMenu = this.m_genesis.newControl(oFF.UiType.MENU);
	toolsToolbarMenu.setName("gsToolsToolbarMenu");
	toolsToolbarMenu.addNewItem().setName("gsToolbarMenuDiscardChanges").setText("Discard changes").setIcon("eraser").registerOnPress(this);
	toolsToolbarMenu.openAt(toolsBtn);
};
oFF.GsGalaxyStudio.prototype.createRecentFilesMenu = function(recentFilesMenu)
{
	if (oFF.notNull(recentFilesMenu))
	{
		if (this.m_recentFiles.size() > 0)
		{
			var recentFilesIterator = this.m_recentFiles.getIterator();
			while (recentFilesIterator.hasNext())
			{
				var filePathStr = recentFilesIterator.next();
				recentFilesMenu.addNewItem().setTag("gsToolbarSubMenuRecentFiles").setText(filePathStr).setIcon("timesheet").registerOnPress(this);
			}
		}
		else
		{
			recentFilesMenu.addNewItem().setTag("gsToolbarSubMenuRecentFiles").setText("None").setIcon(null).setEnabled(false);
		}
		recentFilesMenu.addNewItem().setName("gsToolbarSubMenuRecentFilesClear").setText("Clear").setIcon("delete").setSectionStart(true).registerOnPress(this);
	}
};
oFF.GsGalaxyStudio.prototype.newProject = function()
{
	if (oFF.notNull(this.m_codeEditor))
	{
		this.m_codeEditor.setText("{\r\n \"DocType\": \"FireflyApp\",\r\n \"Content\": {\r\n     \"CType\": \"Label\",\r\n     \"Text\": \"Hello world!\"\r\n },\r\n  \"DataProviders\": [],\r\n  \"Bindings\": []\r\n}");
	}
};
oFF.GsGalaxyStudio.prototype.openRecentFile = function(filePath)
{
	if (oFF.XStringUtils.isNotNullAndNotEmpty(filePath))
	{
		this.openFileByPath(filePath);
	}
};
oFF.GsGalaxyStudio.prototype.clearRecentFiles = function()
{
	this.getProcess().getUserManager().getUserSettings().removeKey(oFF.GsGalaxyStudio.GALAXY_RECENT_FILES_KEY);
	this.m_recentFiles.clear();
};
oFF.GsGalaxyStudio.prototype.openHelpAlert = function()
{
	var helpAlert = this.m_genesis.newControl(oFF.UiType.ALERT);
	helpAlert.setName("gsHelpAlert");
	helpAlert.setTitle("Help");
	helpAlert.setText("Galaxy Studio v0.1 Alpha! \n Proudly brought to you by Firefly!");
	helpAlert.open();
};
oFF.GsGalaxyStudio.prototype.onFileLoaded = function(extResult, file, fileContent, customIdentifier)
{
	if (extResult.isValid() && oFF.notNull(this.m_codeEditor))
	{
		if (oFF.notNull(fileContent))
		{
			this.addRecentFileToUserSettings(file);
			var stringContent = fileContent.getString();
			this.m_codeEditor.setText(stringContent);
			this.setTitle(file.getName());
		}
	}
};
oFF.GsGalaxyStudio.prototype.onPress = function(event)
{
	oFF.DfUiProgram.prototype.onPress.call( this , event);
	var control = event.getControl();
	var controlParent = control.getParent();
	if (event.getControl() === this.m_runActionBarBtn)
	{
		if (this.m_runActionBarBtn.isPressed())
		{
			this.executeApp(this.m_codeEditor.getText());
		}
		else
		{
			this.stopExecution();
		}
	}
	else if (event.getControl() === this.m_stopActionBarBtn)
	{
		this.stopExecution();
	}
	else if (event.getControl() === this.m_splitActionBarBtn)
	{
		if (this.m_splitActionBarBtn.isPressed())
		{
			this.showAppContainer(true);
		}
		else
		{
			this.showAppContainer(false);
		}
	}
	if (oFF.notNull(controlParent) && controlParent.getUiType() === oFF.UiType.TOOLBAR)
	{
		switch (control.getName())
		{
			case "gsFileToolbarBtn":
				this.createFileToolbarMenu(control);
				break;

			case "gsToolsToolbarBtn":
				this.createToolsToolbarMenu(control);
				break;

			case "gsToolbarHelpBtn":
				this.openHelpAlert();
				break;

			default:
		}
	}
	if (oFF.notNull(controlParent) && controlParent.getUiType() === oFF.UiType.MENU && oFF.XString.isEqual(controlParent.getName(), "gsFileToolbarMenu"))
	{
		switch (control.getName())
		{
			case "gsToolbarMenuNew":
				this.newProject();
				break;

			case "gsToolbarMenuSave":
				this.m_genesis.showInfoToast("Save pressed");
				break;

			default:
		}
	}
	if (oFF.notNull(controlParent) && controlParent.getUiType() === oFF.UiType.MENU && oFF.XString.isEqual(controlParent.getName(), "gsToolsToolbarMenu"))
	{
		switch (control.getName())
		{
			case "gsToolbarMenuDiscardChanges":
				this.m_genesis.showInfoToast("Discard changes pressed");
				break;

			default:
		}
	}
	if (oFF.notNull(controlParent) && controlParent.getUiType() === oFF.UiType.MENU_ITEM && oFF.XString.isEqual(controlParent.getName(), "gsToolbarMenuRecent"))
	{
		if (oFF.XString.isEqual(control.getName(), "gsToolbarSubMenuRecentFilesClear"))
		{
			this.clearRecentFiles();
		}
		else if (oFF.XString.isEqual(control.getTag(), "gsToolbarSubMenuRecentFiles"))
		{
			this.openRecentFile(control.getText());
		}
	}
};
oFF.GsGalaxyStudio.prototype.onFileDrop = function(event)
{
	var fileContent = event.getParameters().getStringByKeyExt(oFF.UiControlEvent.PARAM_FILE_CONTENT, null);
	if (oFF.XStringUtils.isNotNullAndNotEmpty(fileContent))
	{
		this.m_codeEditor.setText(fileContent);
	}
};
oFF.GsGalaxyStudio.prototype.onLiveChange = function(event)
{
	var documentStr = event.getParameters().getStringByKeyExt(oFF.UiControlEvent.PARAM_VALUE, null);
	if (this.isRunning())
	{
		this.executeApp(documentStr);
	}
};

oFF.AuGds = function() {};
oFF.AuGds.prototype = new oFF.DfUiProgram();
oFF.AuGds.prototype._ff_c = "AuGds";

oFF.AuGds.DEFAULT_PROGRAM_NAME = "Gds";
oFF.AuGds.MENU_BAR_FILE_BTN = "gdsFileMenuBarBtn";
oFF.AuGds.MENU_BAR_EDIT_BTN = "gdsEditMenuBarBtn";
oFF.AuGds.MENU_BAR_VIEW_BTN = "gdsViewMenuBarBtn";
oFF.AuGds.MENU_BAR_DATA_SOURCE_BTN = "gdsDataSourceMenuBarBtn";
oFF.AuGds.MENU_BAR_FILE_MENU = "gdsFileMenuBarMenu";
oFF.AuGds.MENU_BAR_FILE_MENU_NEW = "gdsMenuBarMenuNew";
oFF.AuGds.MENU_BAR_FILE_MENU_OPEN = "gdsMenuBarMenuOpen";
oFF.AuGds.MENU_BAR_FILE_MENU_SAVE = "gdsMenuBarMenuSave";
oFF.AuGds.MENU_BAR_FILE_MENU_SAVE_AS = "gdsMenuBarMenuSaveAs";
oFF.AuGds.MENU_BAR_EDIT_MENU = "gdsEditMenuBarMenu";
oFF.AuGds.MENU_BAR_EDIT_MENU_CLEAR_RECENTS = "gdsMenuBarEditMenuClearRecents";
oFF.AuGds.MENU_BAR_VIEW_MENU = "gdsViewMenuBarMenu";
oFF.AuGds.MENU_BAR_VIEW_MENU_FILTER_PANEL = "gdsViewMenuBarMenuFilterPanel";
oFF.AuGds.MENU_BAR_VIEW_MENU_NAV_PANEL = "gdsViewMenuBarMenuNavPanel";
oFF.AuGds.MENU_BAR_DATA_SOURCE_MENU = "gdsDataSourceMenuBarMenu";
oFF.AuGds.MENU_BAR_DATA_SOURCE_MENU_SELECT_DATA_SOURCE = "gdsMenuBarDataSourceMenuSelectDataSource";
oFF.AuGds.MENU_BAR_DATA_SOURCE_MENU_RESET = "gdsMenuBarDataSourceMenuReset";
oFF.AuGds.MENU_BAR_DATA_SOURCE_MENU_VARIABLES = "gdsMenuBarDataSourceMenuVariables";
oFF.AuGds.QUICK_ACTION_TOOLBAR = "gdsQuickActionToolbar";
oFF.AuGds.QUICK_ACTION_TOOLBAR_NEW = "gdsQuickActionToolbarNew";
oFF.AuGds.QUICK_ACTION_TOOLBAR_OPEN = "gdsQuickActionToolbarOpen";
oFF.AuGds.QUICK_ACTION_TOOLBAR_SAVE_AS = "gdsQuickActionToolbarSaveAs";
oFF.AuGds.QUICK_ACTION_TOOLBAR_UNDO = "gdsQuickActionToolbarUndo";
oFF.AuGds.QUICK_ACTION_TOOLBAR_REDO = "gdsQuickActionToolbarRedo";
oFF.AuGds.QUICK_ACTION_TOOLBAR_SELECT_DATA_SOURCE = "gdsQuickActionToolbarSelectDataSource";
oFF.AuGds.QUICK_ACTION_TOOLBAR_RESET = "gdsQuickActionToolbarReset";
oFF.AuGds.QUICK_ACTION_TOOLBAR_VARIABLES = "gdsQuickActionToolbarVariables";
oFF.AuGds.RECENT_FILES_LIST_NAME = "gdsRecentFileList";
oFF.AuGds.RECENT_FILES_LIST_HEADER_CLEAR_BTN = "gdsRecentFileListHeaderClearBtn";
oFF.AuGds.RECENT_FILES_LIST_ITEM_TAG = "gdsRecentFileListItem";
oFF.AuGds.QDF_FILE_SYSTEM_KEY = "system";
oFF.AuGds.QDF_FILE_DATA_SOURCE_KEY = "dataSource";
oFF.AuGds.QDF_FILE_INA_REPO_KEY = "inaRepo";
oFF.AuGds.PARAM_SYSTEM = "system";
oFF.AuGds.PARAM_DATASOURCE = "datasource";
oFF.AuGds.RECENT_FILES_SEPARATOR = ",";
oFF.AuGds.GDS_RECENT_FILES_KEY = "queryDesginer_recentFiles";
oFF.AuGds.GDS_AUTO_OPEN_NAVIGATION_PANEL_KEY = "queryDesginer_autoOpenNavigationPanel";
oFF.AuGds.GDS_AUTO_OPEN_FILTER_PANEL_KEY = "queryDesginer_autoOpenFilterPanel";
oFF.AuGds.SELECT_DATA_SOURCE_BTN = "gdsSelectDataSourceBtn";
oFF.AuGds.CONTENT_ACTIVITY_INDICATOR = "gdsContentActivityIndicator";
oFF.AuGds.createRunner = function()
{
	var runner = oFF.KernelBoot.createByName(oFF.AuGds.DEFAULT_PROGRAM_NAME);
	return runner;
};
oFF.AuGds.prototype.m_mainLayout = null;
oFF.AuGds.prototype.m_contentLayout = null;
oFF.AuGds.prototype.m_recentFilesList = null;
oFF.AuGds.prototype.m_statusLabel = null;
oFF.AuGds.prototype.m_system = null;
oFF.AuGds.prototype.m_dataSource = null;
oFF.AuGds.prototype.m_inaRepoStr = null;
oFF.AuGds.prototype.m_messageManager = null;
oFF.AuGds.prototype.m_queryManager = null;
oFF.AuGds.prototype.m_interactiveTable = null;
oFF.AuGds.prototype.m_filterPanel = null;
oFF.AuGds.prototype.m_navigationPanel = null;
oFF.AuGds.prototype.m_variableDialog = null;
oFF.AuGds.prototype.m_toolbar = null;
oFF.AuGds.prototype.m_autoOpenNavPanel = false;
oFF.AuGds.prototype.m_autoOpenFilterPanel = false;
oFF.AuGds.prototype.m_file = null;
oFF.AuGds.prototype.m_qdfFileJson = null;
oFF.AuGds.prototype.m_recentFiles = null;
oFF.AuGds.prototype.newProgram = function()
{
	var prg = new oFF.AuGds();
	prg.setup();
	return prg;
};
oFF.AuGds.prototype.doSetupProgramMetadata = function(metadata)
{
	oFF.DfUiProgram.prototype.doSetupProgramMetadata.call( this , metadata);
	metadata.addOption(oFF.DfProgram.PARAM_FILE, "Specify a gds file", "Relative URI", oFF.XValueType.STRING);
	metadata.addParameter(oFF.AuGds.PARAM_SYSTEM, "The system to connect to.");
	metadata.addParameter(oFF.AuGds.PARAM_DATASOURCE, "The datasource to be used.");
};
oFF.AuGds.prototype.evalArguments = function()
{
	oFF.DfUiProgram.prototype.evalArguments.call( this );
	var argStruct = this.getArgumentStructure();
	var filePathStr = argStruct.getStringByKey(oFF.DfProgram.PARAM_FILE);
	this.createFileFromPath(filePathStr);
	this.m_system = argStruct.getStringByKeyExt(oFF.AuGds.PARAM_SYSTEM, null);
	this.m_dataSource = argStruct.getStringByKeyExt(oFF.AuGds.PARAM_DATASOURCE, null);
};
oFF.AuGds.prototype.initializeProgram = function()
{
	oFF.DfUiProgram.prototype.initializeProgram.call( this );
	this.setupInternal();
};
oFF.AuGds.prototype.releaseObject = function()
{
	this.m_file = oFF.XObjectExt.release(this.m_file);
	this.m_recentFiles = oFF.XObjectExt.release(this.m_recentFiles);
	this.m_recentFilesList = oFF.XObjectExt.release(this.m_recentFilesList);
	this.m_contentLayout = oFF.XObjectExt.release(this.m_contentLayout);
	this.m_mainLayout = oFF.XObjectExt.release(this.m_mainLayout);
	this.m_toolbar = oFF.XObjectExt.release(this.m_toolbar);
	this.m_statusLabel = oFF.XObjectExt.release(this.m_statusLabel);
	this.m_filterPanel = oFF.XObjectExt.release(this.m_filterPanel);
	this.m_navigationPanel = oFF.XObjectExt.release(this.m_navigationPanel);
	this.m_interactiveTable = oFF.XObjectExt.release(this.m_interactiveTable);
	oFF.DfUiProgram.prototype.releaseObject.call( this );
};
oFF.AuGds.prototype.getLogSeverity = function()
{
	return oFF.DfUiProgram.prototype.getLogSeverity.call( this );
};
oFF.AuGds.prototype.isShowMenuBar = function()
{
	return true;
};
oFF.AuGds.prototype.getDefaultWindowSize = function()
{
	return oFF.UiSizeValue.createByCss("70vw", "70vh");
};
oFF.AuGds.prototype.getDefaultProgramName = function()
{
	return oFF.AuGds.DEFAULT_PROGRAM_NAME;
};
oFF.AuGds.prototype.setupInternal = function()
{
	this.initSettings();
};
oFF.AuGds.prototype.initSettings = function()
{
	this.initRecentFiles();
	this.m_autoOpenNavPanel = this.getProcess().getUserManager().getUserSettings().getBooleanByKeyExt(oFF.AuGds.GDS_AUTO_OPEN_NAVIGATION_PANEL_KEY, false);
	this.m_autoOpenFilterPanel = this.getProcess().getUserManager().getUserSettings().getBooleanByKeyExt(oFF.AuGds.GDS_AUTO_OPEN_FILTER_PANEL_KEY, false);
};
oFF.AuGds.prototype.setupQueryManager = function()
{
	this.m_messageManager = oFF.MessageManagerSimple.createMessageManager();
	if (oFF.XStringUtils.isNullOrEmpty(this.m_system) || oFF.XStringUtils.isNullOrEmpty(this.m_dataSource))
	{
		this.showErrorStatusMessage("Please specify a data source!");
		return;
	}
	this.setContentBusy("Loading query...");
	var serviceConfig = oFF.QueryServiceConfig.createWithDataSourceName(this.getApplication(), this.m_system, this.m_dataSource);
	serviceConfig.processQueryManagerCreation(oFF.SyncType.NON_BLOCKING, this, null);
};
oFF.AuGds.prototype.buildUi = function(genesis)
{
	oFF.DfUiProgram.prototype.buildUi.call( this , genesis);
	this.m_mainLayout = genesis.newControl(oFF.UiType.FLEX_LAYOUT);
	this.m_mainLayout.setDirection(oFF.UiFlexDirection.COLUMN);
	this.m_mainLayout.useMaxSpace();
	this.m_mainLayout.setBackgroundColor(oFF.UiColor.WHITE);
	this.m_toolbar = this.m_mainLayout.addNewItemOfType(oFF.UiType.TOOLBAR);
	this.m_toolbar.setName(oFF.AuGds.QUICK_ACTION_TOOLBAR);
	this.m_toolbar.setHeight(oFF.UiUnitValue.createByCss("40px"));
	this.m_toolbar.setWidth(oFF.UiUnitValue.createByCss("100%"));
	this.m_contentLayout = this.m_mainLayout.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	this.m_contentLayout.setDirection(oFF.UiFlexDirection.ROW);
	this.m_contentLayout.useMaxSpace();
	this.m_contentLayout.registerOnFileDrop(this);
	this.m_statusLabel = this.m_mainLayout.addNewItemOfType(oFF.UiType.LABEL);
	this.m_statusLabel.setFlex("0 0 27px");
	this.m_statusLabel.setHeight(oFF.UiUnitValue.createByCss("27px"));
	this.m_statusLabel.setPadding(oFF.UiUnitValue.createByCss("5px"));
	this.m_statusLabel.setBackgroundColor(oFF.UiColor.GREY.newBrighterColor(0.28));
	genesis.setRoot(this.m_mainLayout);
	this.addMenuBarButton(oFF.AuGds.MENU_BAR_FILE_BTN, null, "File", null, this);
	this.addMenuBarButton(oFF.AuGds.MENU_BAR_EDIT_BTN, null, "Edit", null, this);
	this.addMenuBarButton(oFF.AuGds.MENU_BAR_VIEW_BTN, null, "View", null, this);
	this.addMenuBarButton(oFF.AuGds.MENU_BAR_DATA_SOURCE_BTN, null, "Data Source", null, this);
	this.initInitialView();
};
oFF.AuGds.prototype.initInitialView = function()
{
	if (oFF.notNull(this.m_file))
	{
		this.updateQuickActionToolbar();
		this.setTitle(this.m_file.getName());
		this.openQdfFromFile(this.m_file);
	}
	else if (oFF.XStringUtils.isNotNullAndNotEmpty(this.m_system) && oFF.XStringUtils.isNotNullAndNotEmpty(this.m_dataSource))
	{
		this.updateQuickActionToolbar();
		this.setupQueryManager();
		this.showErrorStatusMessage(this.m_messageManager.getSummary());
		this.updateTable();
	}
	else
	{
		this.initHomeView();
	}
};
oFF.AuGds.prototype.initHomeView = function()
{
	this.m_contentLayout.clearItems();
	this.m_recentFilesList = oFF.XObjectExt.release(this.m_recentFilesList);
	this.m_filterPanel = oFF.XObjectExt.release(this.m_filterPanel);
	this.m_navigationPanel = oFF.XObjectExt.release(this.m_navigationPanel);
	this.m_interactiveTable = oFF.XObjectExt.release(this.m_interactiveTable);
	this.m_queryManager = oFF.XObjectExt.release(this.m_queryManager);
	this.m_system = null;
	this.m_dataSource = null;
	this.m_inaRepoStr = null;
	this.m_file = null;
	var homeViewWrapper = this.m_contentLayout.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	homeViewWrapper.setDirection(oFF.UiFlexDirection.COLUMN);
	homeViewWrapper.setAlignItems(oFF.UiFlexAlignItems.CENTER);
	homeViewWrapper.setJustifyContent(oFF.UiFlexJustifyContent.CENTER);
	homeViewWrapper.useMaxSpace();
	var selectDatasourceWrapper = homeViewWrapper.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	selectDatasourceWrapper.setDirection(oFF.UiFlexDirection.COLUMN);
	selectDatasourceWrapper.setAlignItems(oFF.UiFlexAlignItems.CENTER);
	selectDatasourceWrapper.setJustifyContent(oFF.UiFlexJustifyContent.CENTER);
	selectDatasourceWrapper.useMaxSpace();
	var noDataSourceLbl = selectDatasourceWrapper.addNewItemOfType(oFF.UiType.LABEL);
	noDataSourceLbl.setText("No data source selected! Please select a data source!");
	noDataSourceLbl.setPadding(oFF.UiUnitValue.createByCss("10px"));
	var selectDataSourceBtn = selectDatasourceWrapper.addNewItemOfType(oFF.UiType.BUTTON);
	selectDataSourceBtn.setName(oFF.AuGds.SELECT_DATA_SOURCE_BTN);
	selectDataSourceBtn.setText("Select Data Source");
	selectDataSourceBtn.registerOnPress(this);
	if (oFF.notNull(this.m_recentFiles) && this.m_recentFiles.size() > 0)
	{
		this.m_recentFilesList = homeViewWrapper.addNewItemOfType(oFF.UiType.LIST);
		this.m_recentFilesList.setName(oFF.AuGds.RECENT_FILES_LIST_NAME);
		this.m_recentFilesList.setHeight(oFF.UiUnitValue.createByCss("280px"));
		this.m_recentFilesList.setWidth(oFF.UiUnitValue.createByCss("50%"));
		this.m_recentFilesList.setMargin(oFF.UiUnitValue.createByCss("10px"));
		this.m_recentFilesList.setSelectionMode(oFF.UiSelectionMode.SINGLE_SELECT_MASTER);
		this.m_recentFilesList.registerOnSelect(this);
		var listHeaderLayout = this.m_recentFilesList.setNewHeader(oFF.UiType.FLEX_LAYOUT);
		listHeaderLayout.useMaxSpace();
		listHeaderLayout.setJustifyContent(oFF.UiFlexJustifyContent.SPACE_BETWEEN);
		listHeaderLayout.setAlignItems(oFF.UiFlexAlignItems.CENTER);
		var recentFilesLbl = listHeaderLayout.addNewItemOfType(oFF.UiType.LABEL);
		recentFilesLbl.setText("Recent files:");
		var clearRecentFilesBtn = listHeaderLayout.addNewItemOfType(oFF.UiType.BUTTON);
		clearRecentFilesBtn.setName(oFF.AuGds.RECENT_FILES_LIST_HEADER_CLEAR_BTN);
		clearRecentFilesBtn.setIcon("delete");
		clearRecentFilesBtn.setButtonType(oFF.UiButtonType.DESTRUCTIVE);
		clearRecentFilesBtn.setTooltip("Clear recent files...");
		clearRecentFilesBtn.registerOnPress(this);
		this.reloadRecentFilesList();
	}
	this.setTitle("Home");
	this.showWarningStatusMessage("No data source selected!");
	this.updateQuickActionToolbar();
};
oFF.AuGds.prototype.updateStatusMessage = function(message, color)
{
	this.m_statusLabel.setText(message);
	this.m_statusLabel.setFontColor(color);
};
oFF.AuGds.prototype.resetStatusMessage = function()
{
	this.updateStatusMessage(null, null);
};
oFF.AuGds.prototype.showWarningStatusMessage = function(message)
{
	this.updateStatusMessage(message, oFF.UiColor.YELLOW.newDarkerColor(0.22));
};
oFF.AuGds.prototype.showErrorStatusMessage = function(message)
{
	this.updateStatusMessage(message, oFF.UiColor.RED);
};
oFF.AuGds.prototype.setContentBusy = function(text)
{
	var contentActivityIndicator = this.m_contentLayout.getItemByName(oFF.AuGds.CONTENT_ACTIVITY_INDICATOR);
	if (oFF.isNull(contentActivityIndicator))
	{
		this.m_contentLayout.clearItems();
		if (oFF.notNull(this.m_interactiveTable))
		{
			this.m_interactiveTable = oFF.XObjectExt.release(this.m_interactiveTable);
		}
		contentActivityIndicator = this.m_contentLayout.addNewItemOfType(oFF.UiType.ACTIVITY_INDICATOR);
		contentActivityIndicator.useMaxSpace();
	}
	contentActivityIndicator.setText(text);
};
oFF.AuGds.prototype.setCriticalError = function(text)
{
	this.m_contentLayout.clearItems();
	if (oFF.notNull(this.m_interactiveTable))
	{
		this.m_interactiveTable = oFF.XObjectExt.release(this.m_interactiveTable);
	}
	var errorLabel = this.m_contentLayout.addNewItemOfType(oFF.UiType.LABEL);
	errorLabel.useMaxWidth();
	errorLabel.setPadding(oFF.UiUnitValue.createByCss("20px"));
	errorLabel.setTextAlign(oFF.UiTextAlign.CENTER);
	errorLabel.setFontColor(oFF.UiColor.RED);
	errorLabel.setText(text);
	this.showErrorStatusMessage("Error");
};
oFF.AuGds.prototype.updateTable = function()
{
	if (oFF.isNull(this.m_interactiveTable))
	{
		return;
	}
	if (oFF.isNull(this.m_queryManager))
	{
		this.showErrorStatusMessage("No QueryManager.");
		return;
	}
	var activeResultSet = this.m_queryManager.getActiveResultSetContainer();
	if (oFF.isNull(activeResultSet))
	{
		this.showErrorStatusMessage("Cannot fetch results.");
		return;
	}
	if (activeResultSet.hasErrors())
	{
		this.showErrorStatusMessage(activeResultSet.getSummary());
		return;
	}
	this.m_interactiveTable.updateTable();
	this.resetStatusMessage();
};
oFF.AuGds.prototype.updateViews = function()
{
	if (oFF.isNull(this.m_interactiveTable))
	{
		this.m_interactiveTable = oFF.AuGdsInteractiveTableView.create(this.getApplication(), this.m_queryManager, this, this.getGenesis());
		this.m_interactiveTable.getView().setWidth(oFF.UiUnitValue.createByCss("100%"));
		this.m_interactiveTable.getView().setFlex("3 1 50%");
		this.m_contentLayout.clearItems();
		this.m_contentLayout.addItem(this.m_interactiveTable.getView());
		this.m_interactiveTable.registerOnSelectionChange(this);
	}
	else
	{
		this.m_interactiveTable.setQueryManager(this.m_queryManager);
	}
	if (oFF.notNull(this.m_filterPanel))
	{
		this.m_filterPanel.setQueryManager(this.m_queryManager);
	}
	if (oFF.notNull(this.m_navigationPanel))
	{
		this.m_navigationPanel.setQueryManager(this.m_queryManager);
	}
	if (this.m_autoOpenFilterPanel)
	{
		this.toggleFilterPanel();
	}
	if (this.m_autoOpenNavPanel)
	{
		this.toggleNavigationPanel();
	}
	var hasVariables = this.m_queryManager.hasInputEnabledVariables();
	this.m_variableDialog = oFF.XObjectExt.release(this.m_variableDialog);
	if (hasVariables && this.m_queryManager.isSubmitNeeded())
	{
		this.m_variableDialog = oFF.VdUqmEntryPoint.createEntryPoint("Variable Dialog", this.m_queryManager, this);
		this.m_variableDialog.open();
		this.showWarningStatusMessage("Please select mandatory variables!");
		return;
	}
	this.updateTable();
};
oFF.AuGds.prototype.createFileFromPath = function(filePathStr)
{
	if (oFF.notNull(filePathStr))
	{
		var session = this.getSession();
		var queryDesignerFile = oFF.XFile.createExt(session, filePathStr, oFF.PathFormat.AUTO_DETECT, oFF.VarResolveMode.DOLLAR);
		if (oFF.isNull(queryDesignerFile) || queryDesignerFile.isExisting() === false)
		{
			this.log2("File does not exist: ", filePathStr);
			this.m_file = null;
		}
		else
		{
			this.m_file = queryDesignerFile;
		}
	}
};
oFF.AuGds.prototype.openQdfFromFile = function(qdfFile)
{
	if (qdfFile.isExisting())
	{
		qdfFile.processLoad(oFF.SyncType.NON_BLOCKING, this, null, oFF.CompressionType.NONE);
	}
};
oFF.AuGds.prototype.loadStoryFromFileJson = function(qdfJson)
{
	if (this.isQdfJsonFileValid(qdfJson))
	{
		this.m_qdfFileJson = qdfJson;
		this.m_system = this.m_qdfFileJson.getStringByKey(oFF.AuGds.QDF_FILE_SYSTEM_KEY);
		this.m_dataSource = this.m_qdfFileJson.getStringByKey(oFF.AuGds.QDF_FILE_DATA_SOURCE_KEY);
		this.m_inaRepoStr = this.m_qdfFileJson.getStringByKey(oFF.AuGds.QDF_FILE_INA_REPO_KEY);
		this.setupQueryManager();
	}
	else
	{
		this.getGenesis().showErrorToast("Invalid qdf file!");
		this.m_qdfFileJson = null;
	}
};
oFF.AuGds.prototype.isQdfJsonFileValid = function(qdfJson)
{
	if (oFF.isNull(qdfJson))
	{
		return false;
	}
	if (!qdfJson.containsKey(oFF.AuGds.QDF_FILE_SYSTEM_KEY))
	{
		return false;
	}
	if (!qdfJson.containsKey(oFF.AuGds.QDF_FILE_DATA_SOURCE_KEY))
	{
		return false;
	}
	return true;
};
oFF.AuGds.prototype.saveCurrentQueryAsQdfFile = function(outputFile)
{
	if (oFF.isNull(this.m_queryManager))
	{
		this.getGenesis().showErrorToast("No query!");
		return;
	}
	if (oFF.isNull(outputFile))
	{
		this.getGenesis().showErrorToast("Error during file saving!");
		return;
	}
	var inaRepoStr = this.m_queryManager.getQueryModel().serializeToString(oFF.QModelFormat.INA_REPOSITORY);
	var newQdfFileContent = oFF.PrStructure.create();
	newQdfFileContent.putString(oFF.AuGds.QDF_FILE_SYSTEM_KEY, this.m_system);
	newQdfFileContent.putString(oFF.AuGds.QDF_FILE_DATA_SOURCE_KEY, this.m_dataSource);
	newQdfFileContent.putString(oFF.AuGds.QDF_FILE_INA_REPO_KEY, inaRepoStr);
	var fileContent = oFF.XContent.createJsonObjectContent(oFF.ContentType.JSON, newQdfFileContent);
	outputFile.processSave(oFF.SyncType.BLOCKING, null, null, fileContent, oFF.CompressionType.NONE);
	if (outputFile.hasErrors())
	{
		this.getGenesis().showErrorToast(outputFile.getSummary());
	}
	else
	{
		this.addRecentFileEntry(outputFile);
		this.getGenesis().showSuccessToast("Saved!");
	}
};
oFF.AuGds.prototype.initRecentFiles = function()
{
	if (oFF.notNull(this.m_recentFiles))
	{
		this.m_recentFiles.clear();
		this.m_recentFiles = oFF.XObjectExt.release(this.m_recentFiles);
	}
	var recentItemsStr = this.getProcess().getUserManager().getUserSettings().getStringByKeyExt(oFF.AuGds.GDS_RECENT_FILES_KEY, "");
	if (oFF.XStringUtils.isNotNullAndNotEmpty(recentItemsStr))
	{
		this.m_recentFiles = oFF.XStringTokenizer.splitString(recentItemsStr, oFF.AuGds.RECENT_FILES_SEPARATOR);
	}
	else
	{
		this.m_recentFiles = oFF.XListOfString.create();
	}
};
oFF.AuGds.prototype.reloadRecentFilesList = function()
{
	if (oFF.notNull(this.m_recentFilesList))
	{
		this.m_recentFilesList.clearItems();
		var recentFilesIterator = this.m_recentFiles.getIterator();
		while (recentFilesIterator.hasNext())
		{
			var filePathStr = recentFilesIterator.next();
			var tmpListItem = this.m_recentFilesList.addNewItem();
			tmpListItem.setTag(oFF.AuGds.RECENT_FILES_LIST_ITEM_TAG);
			tmpListItem.setText(filePathStr);
		}
	}
};
oFF.AuGds.prototype.saveRecentFilesToUserSettings = function()
{
	if (oFF.notNull(this.m_recentFiles))
	{
		var recentItemsStr = "";
		for (var a = 0; a < this.m_recentFiles.size(); a++)
		{
			var tmpRecentStr = this.m_recentFiles.get(a);
			recentItemsStr = oFF.XStringUtils.concatenate2(recentItemsStr, tmpRecentStr);
			if (a !== this.m_recentFiles.size() - 1)
			{
				recentItemsStr = oFF.XStringUtils.concatenate2(recentItemsStr, oFF.AuGds.RECENT_FILES_SEPARATOR);
			}
		}
		this.getProcess().getUserManager().getUserSettings().putString(oFF.AuGds.GDS_RECENT_FILES_KEY, recentItemsStr);
		this.initRecentFiles();
	}
};
oFF.AuGds.prototype.addRecentFileEntry = function(file)
{
	if (oFF.notNull(file) && oFF.notNull(this.m_recentFiles))
	{
		var filePathStr = file.getVfsUri().getUrl();
		this.m_recentFiles.removeElement(filePathStr);
		this.m_recentFiles.insert(0, filePathStr);
		this.reloadRecentFilesList();
		this.saveRecentFilesToUserSettings();
	}
};
oFF.AuGds.prototype.removeRecentFileEntry = function(filePathStr)
{
	if (oFF.notNull(this.m_recentFiles))
	{
		this.m_recentFiles.removeElement(filePathStr);
		this.reloadRecentFilesList();
		this.saveRecentFilesToUserSettings();
	}
};
oFF.AuGds.prototype.clearRecentFiles = function()
{
	this.getProcess().getUserManager().getUserSettings().removeKey(oFF.AuGds.GDS_RECENT_FILES_KEY);
	this.m_recentFiles.clear();
	var recentFilesList = this.m_contentLayout.getItemByName(oFF.AuGds.RECENT_FILES_LIST_NAME);
	if (oFF.notNull(recentFilesList))
	{
		recentFilesList.clearItems();
	}
	this.getGenesis().showSuccessToast("Recent files successfully cleared!");
};
oFF.AuGds.prototype.createFileMenuBarMenu = function(fileBtn)
{
	var fileToolbarMenu = this.getGenesis().newControl(oFF.UiType.MENU);
	fileToolbarMenu.setName(oFF.AuGds.MENU_BAR_FILE_MENU);
	fileToolbarMenu.addNewItem().setName(oFF.AuGds.MENU_BAR_FILE_MENU_NEW).setText("New").setIcon("document").registerOnPress(this);
	fileToolbarMenu.addNewItem().setName(oFF.AuGds.MENU_BAR_FILE_MENU_OPEN).setText("Open").setIcon("open-folder").registerOnPress(this).setEnabled(false);
	fileToolbarMenu.addNewItem().setName(oFF.AuGds.MENU_BAR_FILE_MENU_SAVE).setText("Save").setIcon("save").registerOnPress(this).setSectionStart(true).setEnabled(oFF.notNull(this.m_file));
	fileToolbarMenu.addNewItem().setName(oFF.AuGds.MENU_BAR_FILE_MENU_SAVE_AS).setText("Save as...").setIcon("save").registerOnPress(this).setEnabled(oFF.notNull(this.m_queryManager));
	fileToolbarMenu.openAt(fileBtn);
};
oFF.AuGds.prototype.createEditToolbarMenu = function(fileBtn)
{
	var editToolbarMenu = this.getGenesis().newControl(oFF.UiType.MENU);
	editToolbarMenu.setName(oFF.AuGds.MENU_BAR_EDIT_MENU);
	editToolbarMenu.addNewItem().setName(oFF.AuGds.MENU_BAR_EDIT_MENU_CLEAR_RECENTS).setText("Clear recent files").setIcon("delete").registerOnPress(this).setEnabled(oFF.notNull(this.m_recentFiles) && this.m_recentFiles.size() > 0);
	editToolbarMenu.openAt(fileBtn);
};
oFF.AuGds.prototype.createViewToolbarMenu = function(fileBtn)
{
	var viewToolbarMenu = this.getGenesis().newControl(oFF.UiType.MENU);
	viewToolbarMenu.setName(oFF.AuGds.MENU_BAR_VIEW_MENU);
	viewToolbarMenu.addNewItem().setName(oFF.AuGds.MENU_BAR_VIEW_MENU_FILTER_PANEL).setText("Show Filter Panel").setIcon(oFF.notNull(this.m_filterPanel) && this.m_filterPanel.getView().getParent() === this.m_contentLayout ? "accept" : null).registerOnPress(this).setEnabled(oFF.notNull(this.m_queryManager));
	viewToolbarMenu.addNewItem().setName(oFF.AuGds.MENU_BAR_VIEW_MENU_NAV_PANEL).setText("Show Navigation Panel").setIcon(oFF.notNull(this.m_navigationPanel) && this.m_navigationPanel.getView().getParent() === this.m_contentLayout ? "accept" : null).registerOnPress(this).setEnabled(oFF.notNull(this.m_queryManager));
	viewToolbarMenu.openAt(fileBtn);
};
oFF.AuGds.prototype.createDataSourceToolbarMenu = function(fileBtn)
{
	var dataSourceToolbarMenu = this.getGenesis().newControl(oFF.UiType.MENU);
	dataSourceToolbarMenu.setName(oFF.AuGds.MENU_BAR_DATA_SOURCE_MENU);
	dataSourceToolbarMenu.addNewItem().setName(oFF.AuGds.MENU_BAR_DATA_SOURCE_MENU_SELECT_DATA_SOURCE).setText("Select Data Source").setIcon("database").registerOnPress(this);
	dataSourceToolbarMenu.addNewItem().setName(oFF.AuGds.MENU_BAR_DATA_SOURCE_MENU_RESET).setText("Reset").setIcon("reset").registerOnPress(this).setEnabled(oFF.notNull(this.m_queryManager));
	dataSourceToolbarMenu.addNewItem().setName(oFF.AuGds.MENU_BAR_DATA_SOURCE_MENU_VARIABLES).setText("Set Variables").setIcon("customize").registerOnPress(this).setSectionStart(true).setEnabled(oFF.notNull(this.m_queryManager) && this.m_queryManager.hasInputEnabledVariables());
	dataSourceToolbarMenu.openAt(fileBtn);
};
oFF.AuGds.prototype.updateQuickActionToolbar = function()
{
	this.m_toolbar.clearItems();
	this.m_toolbar.addNewItemOfType(oFF.UiType.BUTTON).setName(oFF.AuGds.QUICK_ACTION_TOOLBAR_NEW).setTooltip("New").setIcon("document").registerOnPress(this);
	this.m_toolbar.addNewItemOfType(oFF.UiType.BUTTON).setName(oFF.AuGds.QUICK_ACTION_TOOLBAR_OPEN).setTooltip("Open").setIcon("open-folder").registerOnPress(this).setEnabled(false);
	this.m_toolbar.addNewItemOfType(oFF.UiType.BUTTON).setName(oFF.AuGds.QUICK_ACTION_TOOLBAR_SAVE_AS).setTooltip("Save as...").setIcon("save").registerOnPress(this).setEnabled(oFF.notNull(this.m_queryManager));
	this.m_toolbar.addNewItemOfType(oFF.UiType.SPACER);
	this.m_toolbar.addNewItemOfType(oFF.UiType.BUTTON).setName(oFF.AuGds.QUICK_ACTION_TOOLBAR_UNDO).setTooltip("Undo last action...").setIcon("undo").registerOnPress(this).setEnabled(oFF.notNull(this.m_queryManager) && this.getApplication().getUndoManager().getAvailableUndoStepCount() > 0);
	this.m_toolbar.addNewItemOfType(oFF.UiType.BUTTON).setName(oFF.AuGds.QUICK_ACTION_TOOLBAR_REDO).setTooltip("Redo last action...").setIcon("redo").registerOnPress(this).setEnabled(oFF.notNull(this.m_queryManager) && this.getApplication().getUndoManager().getAvailableRedoStepCount() > 0);
	this.m_toolbar.addNewItemOfType(oFF.UiType.SPACER);
	this.m_toolbar.addNewItemOfType(oFF.UiType.BUTTON).setName(oFF.AuGds.QUICK_ACTION_TOOLBAR_SELECT_DATA_SOURCE).setTooltip("Select Data Source").setIcon("database").registerOnPress(this);
	this.m_toolbar.addNewItemOfType(oFF.UiType.BUTTON).setName(oFF.AuGds.QUICK_ACTION_TOOLBAR_RESET).setTooltip("Reset").setIcon("reset").registerOnPress(this).setEnabled(oFF.notNull(this.m_queryManager));
	this.m_toolbar.addNewItemOfType(oFF.UiType.BUTTON).setName(oFF.AuGds.QUICK_ACTION_TOOLBAR_VARIABLES).setTooltip("Set Variables").setIcon("customize").registerOnPress(this).setSectionStart(true).setEnabled(oFF.notNull(this.m_queryManager) && this.m_queryManager.hasInputEnabledVariables());
	this.m_toolbar.addNewItemOfType(oFF.UiType.SPACER);
	if (oFF.notNull(this.m_interactiveTable))
	{
		this.m_toolbar.addAllItems(this.m_interactiveTable.getToolbarItems());
	}
};
oFF.AuGds.prototype.onSelectDataSourcePressed = function()
{
	var appStoreDlgManifest = oFF.ProgramRegistration.getProgramManifest(oFF.AuDatasourcePicker.DEFAULT_PROGRAM_NAME);
	var appStoreDlgStartCfg = oFF.ProgramStartCfg.create(this.getProcess(), appStoreDlgManifest.getName(), null, null);
	var tmpArgs = appStoreDlgStartCfg.getArguments();
	tmpArgs.getArgumentStructure().putString(oFF.AuDatasourcePicker.PARAM_SYSTEM, this.m_system);
	tmpArgs.putXObject(oFF.AuDatasourcePicker.PARAM_LISTENER, this);
	appStoreDlgStartCfg.setParentProcess(this.getProcess());
	appStoreDlgStartCfg.setIsCreatingChildProcess(true);
	appStoreDlgStartCfg.processExecution(oFF.SyncType.NON_BLOCKING, null, null);
};
oFF.AuGds.prototype.onResetDataSourcePressed = function()
{
	if (oFF.notNull(this.m_queryManager) && oFF.notNull(this.m_interactiveTable))
	{
		this.m_queryManager.getConvenienceCommands().resetToDefault();
		this.updateTable();
	}
};
oFF.AuGds.prototype.onOpenVariableDialogPressed = function()
{
	this.m_variableDialog = oFF.XObjectExt.release(this.m_variableDialog);
	this.m_variableDialog = oFF.VdUqmEntryPoint.createEntryPoint("Variable Dialog", this.m_queryManager, this);
	this.m_variableDialog.open();
};
oFF.AuGds.prototype.onOpenPressed = function() {};
oFF.AuGds.prototype.onSavePressed = function()
{
	this.saveCurrentQueryAsQdfFile(this.m_file);
};
oFF.AuGds.prototype.onSaveAsPressed = function()
{
	var defaultDir = "${ff_sdk}/production/queries/gds/";
	var generatedFilePath = oFF.XStringUtils.concatenate3(this.m_system, "_", this.m_queryManager.getQueryModel().getDataSource().getName());
	generatedFilePath = oFF.XString.toLowerCase(generatedFilePath);
	generatedFilePath = oFF.XStringUtils.concatenate2(generatedFilePath, ".qdf");
	generatedFilePath = oFF.XStringUtils.concatenate2(defaultDir, generatedFilePath);
	var newInputPoptup = oFF.UiInputPopup.createNewInputPopup(this.getGenesis(), "Save as...", "Please specify the file", this);
	newInputPoptup.setInputPlaceholder("File path");
	newInputPoptup.setInputValue(generatedFilePath);
	newInputPoptup.open();
	newInputPoptup.selectText(oFF.XString.size(defaultDir), oFF.XString.size(generatedFilePath) - 4);
};
oFF.AuGds.prototype.onUndoPressed = function()
{
	if (oFF.notNull(this.m_interactiveTable))
	{
		this.m_interactiveTable.executeUndo();
	}
};
oFF.AuGds.prototype.onRedoPressed = function()
{
	if (oFF.notNull(this.m_interactiveTable))
	{
		this.m_interactiveTable.executeRedo();
	}
};
oFF.AuGds.prototype.toggleFilterPanel = function()
{
	if (oFF.isNull(this.m_filterPanel))
	{
		this.m_filterPanel = oFF.AuGdsFilterPanel.createFilterPanel(this.getGenesis());
		this.m_filterPanel.setQueryManager(this.m_queryManager);
		this.m_filterPanel.getView().setWidth(oFF.UiUnitValue.createByCss("25%"));
		this.m_filterPanel.getView().setFlex("1 1 25%");
		this.m_filterPanel.addEditActionListener(this);
	}
	if (this.m_filterPanel.getView().getParent() !== null)
	{
		this.m_contentLayout.removeItem(this.m_filterPanel.getView());
		this.m_autoOpenFilterPanel = false;
	}
	else
	{
		this.m_contentLayout.addItem(this.m_filterPanel.getView());
		this.m_autoOpenFilterPanel = true;
	}
	this.getProcess().getUserManager().getUserSettings().putBoolean(oFF.AuGds.GDS_AUTO_OPEN_FILTER_PANEL_KEY, this.m_autoOpenFilterPanel);
};
oFF.AuGds.prototype.toggleNavigationPanel = function()
{
	if (oFF.isNull(this.m_navigationPanel))
	{
		this.m_navigationPanel = oFF.AuGdsNavigationPanel.createNavPanel(this.getGenesis());
		this.m_navigationPanel.setQueryManager(this.m_queryManager);
		this.m_navigationPanel.getView().setWidth(oFF.UiUnitValue.createByCss("25%"));
		this.m_navigationPanel.getView().setFlex("1 1 25%");
		this.m_navigationPanel.addEditActionListener(this);
	}
	if (this.m_navigationPanel.getView().getParent() !== null)
	{
		this.m_contentLayout.removeItem(this.m_navigationPanel.getView());
		this.m_autoOpenNavPanel = false;
	}
	else
	{
		this.m_contentLayout.addItem(this.m_navigationPanel.getView());
		this.m_autoOpenNavPanel = true;
	}
	this.getProcess().getUserManager().getUserSettings().putBoolean(oFF.AuGds.GDS_AUTO_OPEN_NAVIGATION_PANEL_KEY, this.m_autoOpenNavPanel);
};
oFF.AuGds.prototype.onDatasourceSelected = function(dataSource)
{
	if (oFF.isNull(dataSource))
	{
		return;
	}
	if (oFF.notNull(this.m_interactiveTable))
	{
		this.m_interactiveTable.clearTable();
	}
	this.m_system = dataSource.getSystemName();
	this.m_dataSource = dataSource.getFullQualifiedName();
	this.setTitle(oFF.XStringUtils.concatenate3(this.m_system, " - ", dataSource.getName()));
	this.setupQueryManager();
};
oFF.AuGds.prototype.onQueryManagerCreated = function(extResult, queryManager, customIdentifier)
{
	if (extResult.hasErrors())
	{
		this.m_messageManager.addAllMessages(extResult);
		this.setCriticalError(this.m_messageManager.getSummary());
		return;
	}
	this.m_queryManager = extResult.getData();
	if (oFF.XStringUtils.isNotNullAndNotEmpty(this.m_inaRepoStr))
	{
		this.m_queryManager.getQueryModel().getVariableContainer().deserializeExt(oFF.QModelFormat.INA_REPOSITORY, this.m_inaRepoStr);
		this.m_queryManager.submitVariables(oFF.SyncType.NON_BLOCKING, this, null);
	}
	else
	{
		this.updateViews();
	}
};
oFF.AuGds.prototype.onVariableProcessorExecuted = function(extResult, result, customIdentifier)
{
	if (extResult.hasErrors())
	{
		this.getGenesis().showWarningToast("Could not submit variables!");
	}
	else
	{
		this.m_queryManager.getQueryModel().deserializeExt(oFF.QModelFormat.INA_REPOSITORY_NO_VARS, this.m_inaRepoStr);
	}
	this.m_inaRepoStr = null;
	this.updateViews();
};
oFF.AuGds.prototype.onPress = function(event)
{
	oFF.DfUiProgram.prototype.onPress.call( this , event);
	var control = event.getControl();
	var controlParent = control.getParent();
	if (oFF.notNull(controlParent) && controlParent.getUiType() === oFF.UiType.TOOLBAR && controlParent === this.getMenuBar())
	{
		switch (control.getName())
		{
			case oFF.AuGds.MENU_BAR_FILE_BTN:
				this.createFileMenuBarMenu(control);
				break;

			case oFF.AuGds.MENU_BAR_EDIT_BTN:
				this.createEditToolbarMenu(control);
				break;

			case oFF.AuGds.MENU_BAR_VIEW_BTN:
				this.createViewToolbarMenu(control);
				break;

			case oFF.AuGds.MENU_BAR_DATA_SOURCE_BTN:
				this.createDataSourceToolbarMenu(control);
				break;

			default:
		}
	}
	if (oFF.notNull(controlParent) && controlParent.getUiType() === oFF.UiType.MENU && oFF.XString.isEqual(controlParent.getName(), oFF.AuGds.MENU_BAR_FILE_MENU))
	{
		switch (control.getName())
		{
			case oFF.AuGds.MENU_BAR_FILE_MENU_NEW:
				this.initHomeView();
				break;

			case oFF.AuGds.MENU_BAR_FILE_MENU_OPEN:
				this.onOpenPressed();
				break;

			case oFF.AuGds.MENU_BAR_FILE_MENU_SAVE:
				this.onSavePressed();
				break;

			case oFF.AuGds.MENU_BAR_FILE_MENU_SAVE_AS:
				this.onSaveAsPressed();
				break;

			default:
		}
	}
	if (oFF.notNull(controlParent) && controlParent.getUiType() === oFF.UiType.MENU && oFF.XString.isEqual(controlParent.getName(), oFF.AuGds.MENU_BAR_EDIT_MENU))
	{
		switch (control.getName())
		{
			case oFF.AuGds.MENU_BAR_EDIT_MENU_CLEAR_RECENTS:
				this.clearRecentFiles();
				break;

			default:
		}
	}
	if (oFF.notNull(controlParent) && controlParent.getUiType() === oFF.UiType.MENU && oFF.XString.isEqual(controlParent.getName(), oFF.AuGds.MENU_BAR_VIEW_MENU))
	{
		switch (control.getName())
		{
			case oFF.AuGds.MENU_BAR_VIEW_MENU_FILTER_PANEL:
				this.toggleFilterPanel();
				break;

			case oFF.AuGds.MENU_BAR_VIEW_MENU_NAV_PANEL:
				this.toggleNavigationPanel();
				break;

			default:
		}
	}
	if (oFF.notNull(controlParent) && controlParent.getUiType() === oFF.UiType.MENU && oFF.XString.isEqual(controlParent.getName(), oFF.AuGds.MENU_BAR_DATA_SOURCE_MENU))
	{
		switch (control.getName())
		{
			case oFF.AuGds.MENU_BAR_DATA_SOURCE_MENU_SELECT_DATA_SOURCE:
				this.onSelectDataSourcePressed();
				break;

			case oFF.AuGds.MENU_BAR_DATA_SOURCE_MENU_RESET:
				this.onResetDataSourcePressed();
				break;

			case oFF.AuGds.MENU_BAR_DATA_SOURCE_MENU_VARIABLES:
				this.onOpenVariableDialogPressed();
				break;

			default:
		}
	}
	if (oFF.notNull(controlParent) && controlParent.getUiType() === oFF.UiType.TOOLBAR && oFF.XString.isEqual(controlParent.getName(), oFF.AuGds.QUICK_ACTION_TOOLBAR))
	{
		switch (control.getName())
		{
			case oFF.AuGds.QUICK_ACTION_TOOLBAR_NEW:
				this.initHomeView();
				break;

			case oFF.AuGds.QUICK_ACTION_TOOLBAR_OPEN:
				this.onOpenPressed();
				break;

			case oFF.AuGds.QUICK_ACTION_TOOLBAR_SAVE_AS:
				this.onSaveAsPressed();
				break;

			case oFF.AuGds.QUICK_ACTION_TOOLBAR_UNDO:
				this.onUndoPressed();
				break;

			case oFF.AuGds.QUICK_ACTION_TOOLBAR_REDO:
				this.onRedoPressed();
				break;

			case oFF.AuGds.QUICK_ACTION_TOOLBAR_SELECT_DATA_SOURCE:
				this.onSelectDataSourcePressed();
				break;

			case oFF.AuGds.QUICK_ACTION_TOOLBAR_RESET:
				this.onResetDataSourcePressed();
				break;

			case oFF.AuGds.QUICK_ACTION_TOOLBAR_VARIABLES:
				this.onOpenVariableDialogPressed();
				break;

			default:
		}
	}
	if (oFF.XString.isEqual(control.getName(), oFF.AuGds.SELECT_DATA_SOURCE_BTN))
	{
		this.onSelectDataSourcePressed();
	}
	if (oFF.XString.isEqual(control.getName(), oFF.AuGds.RECENT_FILES_LIST_HEADER_CLEAR_BTN))
	{
		this.clearRecentFiles();
	}
};
oFF.AuGds.prototype.onOk = function()
{
	this.updateTable();
};
oFF.AuGds.prototype.onCancel = function()
{
	if (this.m_queryManager.isSubmitNeeded())
	{
		this.showErrorStatusMessage("Variables not set.");
	}
};
oFF.AuGds.prototype.onFileLoaded = function(extResult, file, fileContent, customIdentifier)
{
	this.log("File loaded!");
	if (extResult.isValid())
	{
		if (oFF.notNull(fileContent))
		{
			var jsonContent = fileContent.getJsonContent();
			if (oFF.notNull(jsonContent))
			{
				this.loadStoryFromFileJson(jsonContent.asStructure());
				this.addRecentFileEntry(file);
			}
			else
			{
				this.getGenesis().showErrorToast("Not a json document!");
			}
		}
		else
		{
			this.getGenesis().showErrorToast("Something went wrong! File content is empty!");
		}
	}
	else
	{
		this.getGenesis().showErrorToast("Error while fetching the specified file!");
	}
};
oFF.AuGds.prototype.onInputPopupOkPressed = function(inputStr)
{
	if (oFF.XStringUtils.isNotNullAndNotEmpty(inputStr))
	{
		var session = this.getSession();
		var tmpFile = oFF.XFile.createExt(session, inputStr, oFF.PathFormat.AUTO_DETECT, oFF.VarResolveMode.DOLLAR);
		this.saveCurrentQueryAsQdfFile(tmpFile);
	}
	else
	{
		this.getGenesis().showWarningToast("Cannot save! No file specified!");
	}
};
oFF.AuGds.prototype.onFileDrop = function(event)
{
	var fileContent = event.getParameters().getStringByKeyExt(oFF.UiControlEvent.PARAM_FILE_CONTENT, null);
	if (oFF.XStringUtils.isNotNullAndNotEmpty(fileContent))
	{
		var parser = oFF.JsonParserFactory.newInstance();
		var tmpElement = parser.parse(fileContent);
		var jsonObj = null;
		if (oFF.notNull(tmpElement) && tmpElement.isStructure())
		{
			jsonObj = tmpElement;
		}
		this.loadStoryFromFileJson(jsonObj);
		parser = oFF.XObjectExt.release(parser);
	}
};
oFF.AuGds.prototype.onSelect = function(event)
{
	if (oFF.XString.isEqual(event.getControl().getName(), oFF.AuGds.RECENT_FILES_LIST_NAME))
	{
		var tmpItem = event.getSelectedItem();
		this.createFileFromPath(tmpItem.getText());
		if (oFF.notNull(this.m_file))
		{
			this.setTitle(this.m_file.getName());
			this.openQdfFromFile(this.m_file);
		}
		else
		{
			this.removeRecentFileEntry(tmpItem.getText());
			this.getGenesis().showWarningToast(oFF.XStringUtils.concatenate3("File ", tmpItem.getText(), " does not exist!"));
		}
	}
};
oFF.AuGds.prototype.onSelectionChange = function(event)
{
	this.m_interactiveTable.processSelectionChangeEvent(event);
	this.updateQuickActionToolbar();
};
oFF.AuGds.prototype.onQueryExecuted = function(extResult, resultSetContainer, customIdentifier)
{
	this.updateQuickActionToolbar();
};
oFF.AuGds.prototype.notifyEditAction = function()
{
	this.updateTable();
};

oFF.Gyros = function() {};
oFF.Gyros.prototype = new oFF.DfUiProgram();
oFF.Gyros.prototype._ff_c = "Gyros";

oFF.Gyros.DEFAULT_PROGRAM_NAME = "Gyros";
oFF.Gyros.PARAM_SYSTEM = "system";
oFF.Gyros.PARAM_DATASOURCE = "datasource";
oFF.Gyros.PARAM_PLANNING_SEQUENCE = "planningSequence";
oFF.Gyros.PARAM_TEST = "test";
oFF.Gyros.PROPERTY_USE_OLAP_ENV = "useOlapEnv";
oFF.Gyros.PROPERTY_FUNCTIONAL_VALUES = "enableFunctionalValues";
oFF.Gyros.PROPERTY_DATE_PICKER_VALUE_HELP = "enableDatePickerValueHelp";
oFF.Gyros.PROPERTY_NON_BLOCKING_REQUESTS = "nonBlockingRequests";
oFF.Gyros.PROPERTY_USE_CUSTOM_STORY_LEVEL_TEXT = "useCustomStoryLevelText";
oFF.Gyros.createRunner = function()
{
	return oFF.KernelBoot.createByName(oFF.Gyros.DEFAULT_PROGRAM_NAME);
};
oFF.Gyros.prototype.m_argumentStructure = null;
oFF.Gyros.prototype.m_system = null;
oFF.Gyros.prototype.m_datasource = null;
oFF.Gyros.prototype.m_planningSequence = null;
oFF.Gyros.prototype.m_test = null;
oFF.Gyros.prototype.m_defaultRb = null;
oFF.Gyros.prototype.m_storyRb = null;
oFF.Gyros.prototype.m_appRb = null;
oFF.Gyros.prototype.m_brRb = null;
oFF.Gyros.prototype.m_storyEditableCb = null;
oFF.Gyros.prototype.m_readonlyCb = null;
oFF.Gyros.prototype.m_uqmCb = null;
oFF.Gyros.prototype.m_noneRb = null;
oFF.Gyros.prototype.m_chartRb = null;
oFF.Gyros.prototype.m_tableRb = null;
oFF.Gyros.prototype.m_explorerRb = null;
oFF.Gyros.prototype.m_filterRb = null;
oFF.Gyros.prototype.m_displayMcb = null;
oFF.Gyros.prototype.m_linkMcb = null;
oFF.Gyros.prototype.m_commandMcb = null;
oFF.Gyros.prototype.m_optionsIcon = null;
oFF.Gyros.prototype.m_options = null;
oFF.Gyros.prototype.m_optionsPopover = null;
oFF.Gyros.prototype.m_changeDsBtn = null;
oFF.Gyros.prototype.m_editToggleBtn = null;
oFF.Gyros.prototype.m_mobileValueHelpBtn = null;
oFF.Gyros.prototype.m_openBtn = null;
oFF.Gyros.prototype.m_optimizedBtn = null;
oFF.Gyros.prototype.m_storyTa = null;
oFF.Gyros.prototype.m_widgetTa = null;
oFF.Gyros.prototype.m_sacDataTa = null;
oFF.Gyros.prototype.m_tokenPopover = null;
oFF.Gyros.prototype.m_messageManager = null;
oFF.Gyros.prototype.m_queryManager = null;
oFF.Gyros.prototype.m_variableProcessor = null;
oFF.Gyros.prototype.m_vdDialog = null;
oFF.Gyros.prototype.m_vdToken = null;
oFF.Gyros.prototype.m_orcaFunctions = null;
oFF.Gyros.prototype.m_orcaDialog = null;
oFF.Gyros.prototype.m_orcaToken = null;
oFF.Gyros.prototype.m_linkage = null;
oFF.Gyros.prototype.m_isPlanningSequence = false;
oFF.Gyros.prototype.m_forcePrompt = false;
oFF.Gyros.prototype.m_disableExitVariables = false;
oFF.Gyros.prototype.m_disableDynamicVariablesInStory = false;
oFF.Gyros.prototype.m_disableDynamicVariablesInWidget = false;
oFF.Gyros.prototype.m_featureDialog = null;
oFF.Gyros.prototype.newProgram = function()
{
	var gyros = new oFF.Gyros();
	gyros.setup();
	return gyros;
};
oFF.Gyros.prototype.isShowMenuBar = function()
{
	return true;
};
oFF.Gyros.prototype.doSetupProgramMetadata = function(metadata)
{
	oFF.DfUiProgram.prototype.doSetupProgramMetadata.call( this , metadata);
	metadata.addParameter(oFF.Gyros.PARAM_SYSTEM, "The system to connect to.");
	metadata.addParameter(oFF.Gyros.PARAM_DATASOURCE, "The datasource to be used (Can be empty for planning sequences).");
	metadata.addParameter(oFF.Gyros.PARAM_PLANNING_SEQUENCE, "The planning sequence to be used (Optional).");
	metadata.addParameter(oFF.Gyros.PARAM_TEST, "The name of the running test (Optional).");
};
oFF.Gyros.prototype.evalArguments = function()
{
	this.m_argumentStructure = this.getArgumentStructure();
	if (this.m_argumentStructure.getIntegerByKeyExt(oFF.DfProgram.PARAM_XVERSION, -3) === -3)
	{
		this.m_argumentStructure.putInteger(oFF.DfProgram.PARAM_XVERSION, oFF.XVersion.V124_INIT_ACTION_FOR_FUSION);
	}
	oFF.DfUiProgram.prototype.evalArguments.call( this );
	this.m_system = this.getParameterValue(oFF.Gyros.PARAM_SYSTEM);
	this.m_datasource = this.getParameterValue(oFF.Gyros.PARAM_DATASOURCE);
	this.m_planningSequence = this.getParameterValue(oFF.Gyros.PARAM_PLANNING_SEQUENCE);
	this.m_test = this.getParameterValue(oFF.Gyros.PARAM_TEST);
	if (oFF.XStringUtils.isNullOrEmpty(this.m_system) || oFF.XStringUtils.isNullOrEmpty(this.m_planningSequence) && oFF.XStringUtils.isNullOrEmpty(this.m_datasource))
	{
		this.m_system = "KIW";
		this.m_datasource = "query:[0BOC_TEST_VARIABLE_TYPES_1]";
	}
};
oFF.Gyros.prototype.getParameterValue = function(name)
{
	var value = this.getSession().getEnvironment().getStringByKey(name);
	if (oFF.XStringUtils.isNullOrEmpty(value))
	{
		value = this.m_argumentStructure.getStringByKey(name);
	}
	return value;
};
oFF.Gyros.prototype.initializeProgram = function()
{
	oFF.DfUiProgram.prototype.initializeProgram.call( this );
	oFF.ApplicationUiModule.getInstance();
	this.m_messageManager = oFF.MessageManager.createMessageManagerExt(this.getSession());
	this.m_linkage = oFF.XHashMapByString.create();
	this.m_disableDynamicVariablesInStory = true;
	this.m_disableDynamicVariablesInWidget = true;
	oFF.VdVariableModel.CURRENT_DATE = oFF.XDate.createDateSafe("2017-04-18");
	var traceInfo = oFF.TraceInfo.create();
	traceInfo.setTraceType(oFF.TraceType.URL);
	traceInfo.setTraceName(this.m_test);
	this.getApplication().getConnectionPool().setTraceInfo(this.m_system, traceInfo);
	this.setupDatasource();
	this.m_options = oFF.OlapUiPropertyListHelper.create(this.getUiManager());
	this.m_options.addBooleanProperty(oFF.Gyros.PROPERTY_USE_OLAP_ENV, "Use Olap Env", false);
	this.m_options.addBooleanProperty(oFF.Gyros.PROPERTY_FUNCTIONAL_VALUES, "Enable Functional Values", false);
	this.m_options.addBooleanProperty(oFF.Gyros.PROPERTY_DATE_PICKER_VALUE_HELP, "Enable DatePicker with ValueHelp", false);
	this.m_options.addBooleanProperty(oFF.Gyros.PROPERTY_NON_BLOCKING_REQUESTS, "Send Non-Blocking requests", false);
	this.m_options.addBooleanProperty(oFF.Gyros.PROPERTY_USE_CUSTOM_STORY_LEVEL_TEXT, "Use custom story level text", false);
};
oFF.Gyros.prototype.setupDatasource = function()
{
	if (oFF.XStringUtils.isNotNullAndNotEmpty(this.m_datasource))
	{
		var serviceConfig = oFF.QueryServiceConfig.createWithDataSourceName(this.getApplication(), this.m_system, this.m_datasource);
		var syncAction = serviceConfig.processQueryManagerCreation(oFF.SyncType.BLOCKING, null, null);
		if (syncAction.hasErrors())
		{
			this.m_messageManager.addAllMessages(syncAction);
			return;
		}
		this.m_queryManager = syncAction.getData();
	}
	if (oFF.XStringUtils.isNotNullAndNotEmpty(this.m_planningSequence))
	{
		var planningServiceDataSource = oFF.QFactory.createDataSource();
		planningServiceDataSource.setFullQualifiedName("$[][][MY_DATA_AREA]");
		var planningServiceConfig = oFF.OlapApiModule.SERVICE_TYPE_PLANNING.createServiceConfig(this.getApplication());
		planningServiceConfig.setSystemName(this.m_system);
		planningServiceConfig.setDataSource(planningServiceDataSource);
		planningServiceConfig.getProperties().putStringNotNull(oFF.PlanningConstants.PERSISTENCE_TYPE, oFF.CellLockingType.DEFAULT_SETTING_BACKEND.getName());
		var result = planningServiceConfig.processServiceCreation(oFF.SyncType.BLOCKING, null, null);
		if (result.hasErrors())
		{
			this.m_messageManager.addAllMessages(result);
			return;
		}
		var planningService = result.getData();
		var dataArea = planningService.getPlanningContext();
		var commandIdentifier = dataArea.createPlanningSequenceIdentifier(this.m_planningSequence);
		var creator = dataArea.createPlanningCommand(commandIdentifier);
		if (creator.hasErrors())
		{
			this.m_messageManager.addAllMessages(creator);
			return;
		}
		var planningCommand = creator.getData();
		var planningSequence = planningCommand.getCreatedPlanningCommandWithId();
		this.m_variableProcessor = planningSequence.getVariableProcessor();
		this.m_isPlanningSequence = true;
	}
};
oFF.Gyros.prototype.buildUi = function(genesis)
{
	this.m_changeDsBtn = this.addMenuBarButton("changeDatasourceBtn", null, "Change Datasource", null, this);
	this.m_editToggleBtn = this.addMenuBarButton("editTogglesBtn", null, "Edit Feature Toggles", null, this);
	this.m_mobileValueHelpBtn = this.addMenuBarButton("mobileValueHelpBtn", null, "Mobile Value Help", null, this);
	var root = genesis.newRoot(oFF.UiType.FLEX_LAYOUT);
	root.setDirection(oFF.UiFlexDirection.COLUMN);
	root.setPaddingCss("5px");
	if (this.m_messageManager.hasErrors() || this.getVariableProcessor() === null)
	{
		this.buildGyrosErrorOutput(root);
		return;
	}
	var inner = root.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	inner.setJustifyContent(oFF.UiFlexJustifyContent.SPACE_BETWEEN);
	inner.setFlex("0 0 auto");
	var left = inner.addNewItemOfType(oFF.UiType.VERTICAL_LAYOUT);
	left.setWidthCss("33%");
	this.buildContextSection(left);
	this.buildLevelSection(left);
	var checkboxes = left.addNewItemOfType(oFF.UiType.HORIZONTAL_LAYOUT);
	this.m_storyEditableCb = checkboxes.addNewItemOfType(oFF.UiType.CHECKBOX);
	this.m_storyEditableCb.setName("storyEditable").setText("Story Editable").setChecked(true);
	this.m_readonlyCb = checkboxes.addNewItemOfType(oFF.UiType.CHECKBOX);
	this.m_readonlyCb.setName("readonlyCb").setText("Readonly");
	this.m_uqmCb = checkboxes.addNewItemOfType(oFF.UiType.CHECKBOX);
	this.m_uqmCb.setName("uqmCb").setText("UQM");
	left.addNewItemOfType(oFF.UiType.SPACER);
	this.buildDisplaySection(left);
	this.buildLinkSection(left);
	this.buildCommandSection(left);
	this.m_optionsIcon = left.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_optionsIcon.setName("options").setText("More Options");
	this.m_optionsIcon.registerOnPress(this);
	var right = inner.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	right.setDirection(oFF.UiFlexDirection.COLUMN);
	right.setWidthCss("66%");
	this.m_openBtn = right.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_openBtn.setName("openBtn").setText("Open Variable Dialog");
	this.m_openBtn.registerOnPress(this);
	this.m_optimizedBtn = right.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_optimizedBtn.setName("optimizedBtn").setText("Perform Story Filter Optimization");
	this.m_optimizedBtn.registerOnPress(this);
	var outputSection = right.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	outputSection.setHeightCss("100%");
	outputSection.setFlex("auto");
	var output1 = outputSection.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	output1.setFlex("auto");
	output1.setDirection(oFF.UiFlexDirection.COLUMN);
	output1.setAlignItems(oFF.UiFlexAlignItems.CENTER);
	output1.addNewItemOfType(oFF.UiType.LABEL).setText("I/O Default/Story").setHeightCss("7%");
	this.m_storyTa = output1.addNewItemOfType(oFF.UiType.TEXT_AREA);
	this.m_storyTa.setName("storyTa");
	this.m_storyTa.setBackgroundColor(oFF.UiColor.WHITE);
	this.m_storyTa.setSizeCss("100%", "100%");
	var output2 = outputSection.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	output2.setFlex("auto");
	output2.setDirection(oFF.UiFlexDirection.COLUMN);
	output2.setAlignItems(oFF.UiFlexAlignItems.CENTER);
	output2.addNewItemOfType(oFF.UiType.LABEL).setText("I/O Widget").setHeightCss("7%");
	this.m_widgetTa = output2.addNewItemOfType(oFF.UiType.TEXT_AREA);
	this.m_widgetTa.setName("widgetTa");
	this.m_widgetTa.setBackgroundColor(oFF.UiColor.WHITE);
	this.m_widgetTa.setSizeCss("100%", "100%");
	var output3 = outputSection.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	output3.setFlex("auto");
	output3.setDirection(oFF.UiFlexDirection.COLUMN);
	output3.setAlignItems(oFF.UiFlexAlignItems.CENTER);
	output3.addNewItemOfType(oFF.UiType.LABEL).setText("SAC Data").setHeightCss("7%");
	this.m_sacDataTa = output3.addNewItemOfType(oFF.UiType.TEXT_AREA);
	this.m_sacDataTa.setName("sacDataTa");
	this.m_sacDataTa.setBackgroundColor(oFF.UiColor.WHITE);
	this.m_sacDataTa.setSizeCss("100%", "100%");
	this.setupUi();
	this.updateState();
};
oFF.Gyros.prototype.buildGyrosErrorOutput = function(parent)
{
	var errorLabel = parent.addNewItemOfType(oFF.UiType.TEXT_AREA);
	errorLabel.setName("gyrosErrorOutput");
	errorLabel.setEnabled(false);
	errorLabel.setBackgroundColor(oFF.UiColor.TRANSPARENT);
	errorLabel.setWidthCss("100%");
	errorLabel.setHeightCss("100%");
	var buffer = oFF.XStringBuffer.create();
	buffer.append("Gyros could not create a variable processor to work with. Reason:\n");
	buffer.append(this.m_messageManager.getSummary());
	errorLabel.setText(buffer.toString());
};
oFF.Gyros.prototype.buildContextSection = function(parent)
{
	parent.addNewItemOfType(oFF.UiType.LABEL).setText("Context:");
	var group = parent.addNewItemOfType(oFF.UiType.RADIO_BUTTON_GROUP);
	group.setColumnCount(2);
	this.m_defaultRb = group.addNewRadioButton();
	this.m_defaultRb.setName("defaultRb").setText("Default");
	this.m_defaultRb.registerOnChange(this);
	this.m_defaultRb.setSelected(true);
	this.m_storyRb = group.addNewRadioButton();
	this.m_storyRb.setName("storyRb").setText("Story");
	this.m_storyRb.registerOnChange(this);
	this.m_appRb = group.addNewRadioButton();
	this.m_appRb.setName("appRb").setText("AnalyticApp");
	this.m_brRb = group.addNewRadioButton();
	this.m_brRb.setName("brRb").setText("Board Room");
};
oFF.Gyros.prototype.buildLevelSection = function(parent)
{
	parent.addNewItemOfType(oFF.UiType.LABEL).setText("Level:");
	var group = parent.addNewItemOfType(oFF.UiType.RADIO_BUTTON_GROUP);
	group.setColumnCount(3);
	this.m_noneRb = group.addNewRadioButton();
	this.m_noneRb.setName("noneRb").setText("None");
	this.m_noneRb.setSelected(true);
	this.m_chartRb = group.addNewRadioButton();
	this.m_chartRb.setName("chartRb").setText("Chart");
	this.m_tableRb = group.addNewRadioButton();
	this.m_tableRb.setName("tableRb").setText("Table");
	this.m_explorerRb = group.addNewRadioButton();
	this.m_explorerRb.setName("explorerRb").setText("Explorer");
	this.m_filterRb = group.addNewRadioButton();
	this.m_filterRb.setName("filterRb").setText("Filter");
};
oFF.Gyros.prototype.buildDisplaySection = function(parent)
{
	var layout = parent.addNewItemOfType(oFF.UiType.VERTICAL_LAYOUT);
	layout.addNewItemOfType(oFF.UiType.LABEL).setText("Display Variables:");
	this.m_displayMcb = layout.addNewItemOfType(oFF.UiType.MULTI_COMBO_BOX);
	this.m_displayMcb.setName("displayVariablesMcb");
};
oFF.Gyros.prototype.buildLinkSection = function(parent)
{
	var layout = parent.addNewItemOfType(oFF.UiType.VERTICAL_LAYOUT);
	var horizontal = layout.addNewItemOfType(oFF.UiType.HORIZONTAL_LAYOUT);
	horizontal.addNewItemOfType(oFF.UiType.LABEL).setText("Show Link Variable Tooltips:");
	var icon = horizontal.addNewItemOfType(oFF.UiType.ICON).setIcon("message-information").setPaddingCss("3px");
	icon.setTooltip("Only setting the tooltip will be interpreted as a missing link (FPA10-3392) and instead of linked valueHelp, the default will be used.");
	this.m_linkMcb = layout.addNewItemOfType(oFF.UiType.MULTI_COMBO_BOX);
	this.m_linkMcb.setName("linkVariablesMcb");
};
oFF.Gyros.prototype.buildCommandSection = function(parent)
{
	var layout = parent.addNewItemOfType(oFF.UiType.VERTICAL_LAYOUT);
	layout.addNewItemOfType(oFF.UiType.LABEL).setText("Commands:");
	this.m_commandMcb = layout.addNewItemOfType(oFF.UiType.MULTI_COMBO_BOX);
	this.m_commandMcb.setName("commandMcb");
	this.m_commandMcb.registerOnSelectionChange(this);
	var commands = oFF.GyrosCommand.getAllCommands();
	for (var i = 0; i < commands.size(); i++)
	{
		var command = commands.get(i);
		var item = this.m_commandMcb.addNewItem();
		item.setName(command.getName());
		item.setText(command.getDescription());
	}
};
oFF.Gyros.prototype.setupUi = function()
{
	var variables = this.getVariableProcessor().getInputEnabledVariables();
	this.m_displayMcb.clearItems();
	this.m_linkMcb.clearItems();
	for (var i = 0; i < variables.size(); i++)
	{
		var variable = variables.get(i);
		var displayItem = this.m_displayMcb.addNewItem();
		displayItem.setName(variable.getName());
		displayItem.setText(variable.getText());
		displayItem.setSelected(true);
		var linkItem = this.m_linkMcb.addNewItem();
		linkItem.setName(variable.getName());
		linkItem.setText(variable.getText());
	}
};
oFF.Gyros.prototype.showVariablePrompt = function(anchor, optimized)
{
	oFF.OlapUiValueHelpAbstract.s_syncType = this.m_options.getBooleanValue(oFF.Gyros.PROPERTY_NON_BLOCKING_REQUESTS) ? oFF.SyncType.NON_BLOCKING : oFF.SyncType.BLOCKING;
	var commands = this.m_commandMcb.getSelectedItems();
	for (var i = 0; i < commands.size(); i++)
	{
		var cmdName = commands.get(i).getName();
		oFF.GyrosCommand.getByName(cmdName).execute(this);
	}
	if (this.m_storyRb.isSelected() && this.getVariableProcessor().isReinitNeeded())
	{
		var listener = oFF.VariableProcessorCallbackLambda.createSingleUse( function(result){
			if (result.isValid())
			{
				this.showVariablePrompt(anchor, optimized);
			}
		}.bind(this));
		this.getVariableProcessor().reInitVariablesAfterSubmit(oFF.OlapUiValueHelpAbstract.s_syncType, listener, anchor);
		return;
	}
	var variablesToDisplay = oFF.XHashSetOfString.create();
	var selectedItems1 = this.m_displayMcb.getSelectedItems();
	for (var j = 0; j < selectedItems1.size(); j++)
	{
		variablesToDisplay.add(selectedItems1.get(j).getName());
	}
	if (this.m_defaultRb.isSelected())
	{
		this.showDefaultPrompt(anchor, variablesToDisplay, optimized);
	}
	else if (this.m_uqmCb.isChecked())
	{
		this.showUqmPrompt(anchor, variablesToDisplay, optimized);
	}
	else
	{
		this.showOrcaPrompt(anchor, variablesToDisplay);
	}
};
oFF.Gyros.prototype.showDefaultPrompt = function(anchor, variablesToDisplay, optimized)
{
	this.m_vdToken = oFF.XObjectExt.release(this.m_vdToken);
	this.m_vdDialog = oFF.XObjectExt.release(this.m_vdDialog);
	var displayManager = oFF.OlapUiDisplayFactory.createFactoryForDialog(this.getUiManager());
	var context = oFF.OlapUiContext.createContext(this.getUiManager(), displayManager);
	var config = oFF.VdConfiguration.createConfig("Variables", this.getVariableProcessor());
	config.setVariablesToDisplay(variablesToDisplay);
	config.setEnterOnFocusLeave(false);
	config.setFunctionalValuesEnabled(this.m_options.getBooleanValue(oFF.Gyros.PROPERTY_FUNCTIONAL_VALUES));
	config.setUseDatePickerValueHelp(this.m_options.getBooleanValue(oFF.Gyros.PROPERTY_DATE_PICKER_VALUE_HELP));
	config.setUseDatePicker(oFF.isNull(this.m_queryManager) || this.m_queryManager.getSystemType().isTypeOf(oFF.SystemType.ABAP));
	var controller;
	if (oFF.notNull(anchor))
	{
		controller = this.m_vdToken = oFF.VdVariableForm.createAsToken(context, config);
	}
	else
	{
		controller = this.m_vdDialog = oFF.VdVariableDialog.createAsDisplay(context, config, this);
	}
	this.m_vdDialog.registerSubmitListener(this);
	var firstVarName = this.getFirstVarName(variablesToDisplay);
	if (optimized && controller.supportsStoryFilterOptimization(firstVarName))
	{
		controller.performStoryFilterOptimizationWorkflow(firstVarName);
	}
	else if (oFF.notNull(this.m_vdToken))
	{
		var genesis = oFF.UiGenesis.create(anchor, oFF.UiPosition.CONTENT, oFF.UiOperation.SET, 0, 0);
		this.m_vdToken.buildUi(genesis);
	}
	else if (oFF.notNull(this.m_vdDialog))
	{
		this.m_vdDialog.open();
	}
};
oFF.Gyros.prototype.showOrcaPrompt = function(anchor, variablesToDisplay)
{
	this.m_orcaToken = oFF.XObjectExt.release(this.m_orcaToken);
	this.m_orcaDialog = oFF.XObjectExt.release(this.m_orcaDialog);
	this.m_orcaFunctions = oFF.XObjectExt.release(this.m_orcaFunctions);
	var i18n = this.getUiManager().getLocalization();
	var params = oFF.VdOrcaNativeParams.create();
	params.queryManager = oFF.isNull(this.m_variableProcessor) ? this.m_queryManager : null;
	params.varProcessor = this.getVariableProcessor();
	params.numberFormatter = oFF.GyrosNumberFormatter.create();
	params.dateDisplayFormat = "MMM d, y";
	params.storyEditable = this.m_storyEditableCb.isChecked();
	params.readOnly = this.m_readonlyCb.isChecked();
	params.showChartVariables = this.m_chartRb.isSelected() || this.m_tableRb.isSelected();
	params.isWidget = this.m_chartRb.isSelected() || this.m_tableRb.isSelected() || this.m_explorerRb.isSelected();
	params.useTableMessage = this.m_tableRb.isSelected();
	params.analyticApp = this.m_appRb.isSelected();
	params.variablesToDisplay = variablesToDisplay;
	params.customStoryButtonText = this.m_options.getBooleanValue(oFF.Gyros.PROPERTY_USE_CUSTOM_STORY_LEVEL_TEXT) ? oFF.Gyros.PROPERTY_USE_CUSTOM_STORY_LEVEL_TEXT : null;
	params.presetVariablesButtonText = this.m_brRb.isSelected() ? i18n.getText(oFF.VariableDialogI18n.I18N_VD_SET_FOR_CURRENT_PAGE) : null;
	params.datasetVariablesButtonText = this.m_brRb.isSelected() ? i18n.getText(oFF.VariableDialogI18n.I18N_VD_SET_FOR_ALL_PAGES) : null;
	params.preSetVariablesEditable = this.m_brRb.isSelected() && this.m_noneRb.isSelected();
	params.datasetVariablesEditable = this.m_brRb.isSelected() && this.m_noneRb.isSelected();
	params.showVariantSection = this.m_brRb.isSelected() && this.m_noneRb.isSelected();
	params.isPlanningSequence = this.m_isPlanningSequence;
	params.forcePrompt = this.m_forcePrompt;
	params.disableExitVariables = this.m_disableExitVariables;
	params.isStoryUsingDynamicVariables = !this.m_disableDynamicVariablesInStory;
	params.isWidgetUsingDynamicVariables = !this.m_disableDynamicVariablesInWidget;
	params.linkage = this.m_linkage;
	params.linkTooltips = this.createLinkTooltips();
	if (oFF.XStringUtils.isNotNullAndNotEmpty(this.m_storyTa.getText()))
	{
		params.datasetVariables = oFF.JsonParserFactory.createFromSafeString(this.m_storyTa.getText());
	}
	if (oFF.XStringUtils.isNotNullAndNotEmpty(this.m_widgetTa.getText()))
	{
		params.preSetVariables = oFF.JsonParserFactory.createFromSafeString(this.m_widgetTa.getText());
	}
	var sacData = this.m_sacDataTa.getText();
	if (oFF.XStringUtils.isNotNullAndNotEmpty(sacData))
	{
		var sacDataStructure = oFF.JsonParserFactory.createFromSafeString(sacData);
		params.filterVariables = sacDataStructure.getStructureByKey("Filter");
		params.dimensionDisplayInfo = sacDataStructure.getStructureByKey("DimensionDisplayInfo");
	}
	var variables = this.getVariableProcessor().getInputEnabledAndNonTechnicalVariables();
	if (this.m_filterRb.isSelected())
	{
		if (variablesToDisplay.size() === 1)
		{
			params.singleVariableKey = variablesToDisplay.getValuesAsReadOnlyListOfString().get(0);
		}
		else if (variables.size() >= 1)
		{
			var singleVarName = variables.get(0).getName();
			params.singleVariableKey = singleVarName;
			params.variablesToDisplay = oFF.XHashSetOfString.create();
			params.variablesToDisplay.add(singleVarName);
		}
	}
	if (oFF.notNull(anchor))
	{
		this.m_orcaFunctions = this.m_orcaToken = oFF.VdOrcaEntryPoint.createEntryPointToken(null, params);
		this.m_orcaFunctions.registerSubmitListener(this);
		this.m_orcaToken.buildUiOnControl(anchor);
	}
	else
	{
		this.m_orcaFunctions = this.m_orcaDialog = oFF.VdOrcaEntryPoint.createEntryPointDisplay(null, params, this);
		this.m_orcaFunctions.registerSubmitListener(this);
		this.m_orcaDialog.open();
	}
};
oFF.Gyros.prototype.showUqmPrompt = function(anchor, variablesToDisplay, optimized)
{
	this.m_orcaToken = oFF.XObjectExt.release(this.m_orcaToken);
	this.m_orcaDialog = oFF.XObjectExt.release(this.m_orcaDialog);
	this.m_orcaFunctions = oFF.XObjectExt.release(this.m_orcaFunctions);
	var application = this.getApplication();
	var params = oFF.PrFactory.createStructure();
	if (oFF.notNull(this.m_queryManager))
	{
		var gyrosId = "gyrosId";
		this.m_queryManager.getTagging().put(oFF.VdStandalone.VARIABLE_PROCESSOR_ID, gyrosId);
		params.putString(oFF.VdStandalone.VARIABLE_PROCESSOR_ID, gyrosId);
	}
	var isBw = this.isBw();
	params.putString(oFF.VdStandalone.TITLE, this.getTitle());
	params.putString(oFF.VdStandalone.DATE_DISPLAY_FORMAT, "MMM d, y");
	params.putString(oFF.VdStandalone.SCENARIO, this.getScenario().getName());
	params.putString(oFF.VdStandalone.LEVEL, this.getLevel().getName());
	params.putBoolean(oFF.VdStandalone.UPDATE_DYNAMIC_VARIABLES_ON_START, false);
	params.putBoolean(oFF.VdStandalone.USE_DATEPICKER, isBw);
	params.putBoolean(oFF.VdStandalone.HIDE_OPERATOR_NOT_BEWEEN, !isBw);
	params.putBoolean(oFF.VdStandalone.HIDE_LEVEL_SECTION, this.getScenario() === oFF.VdOrcaScenario.ANALYTIC_APP && !this.m_storyEditableCb.isChecked());
	params.putBoolean(oFF.VdStandalone.STORY_EDITABLE, this.m_storyEditableCb.isChecked());
	params.putBoolean(oFF.VdStandalone.READ_ONLY, this.m_readonlyCb.isChecked());
	params.putBoolean(oFF.VdStandalone.DISABLE_EXIT, this.m_disableExitVariables);
	params.putBoolean(oFF.VdStandalone.TOP_LEVEL_DYNAMIC_VARIABLES, !this.m_disableDynamicVariablesInStory);
	params.putBoolean(oFF.VdStandalone.BOTTOM_LEVEL_DYNAMIC_VARIABLES, !this.m_disableDynamicVariablesInWidget);
	var list = params.putNewList(oFF.VdStandalone.VARIABLE_NAMES);
	var it = variablesToDisplay.getIterator();
	while (it.hasNext())
	{
		list.addString(it.next());
	}
	oFF.XObjectExt.release(it);
	params.putString(oFF.VdStandalone.START_VALUES_FORMAT, oFF.VdValueFormat.DATA_QUERY_MODEL.getName());
	if (oFF.XStringUtils.isNotNullAndNotEmpty(this.m_storyTa.getText()))
	{
		params.put(oFF.VdStandalone.TOP_LEVEL_VALUES, oFF.JsonParserFactory.createFromSafeString(this.m_storyTa.getText()));
	}
	if (oFF.XStringUtils.isNotNullAndNotEmpty(this.m_widgetTa.getText()))
	{
		params.put(oFF.VdStandalone.BOTTOM_LEVEL_VALUES, oFF.JsonParserFactory.createFromSafeString(this.m_widgetTa.getText()));
	}
	if (oFF.notNull(anchor))
	{
		this.m_orcaFunctions = this.m_orcaToken = oFF.VdStandalone.createTokenWithParameters(application, null, params);
	}
	else
	{
		this.m_orcaFunctions = this.m_orcaDialog = oFF.VdStandalone.createDisplayWithParameters(application, null, params, this);
	}
	this.m_orcaFunctions.registerSubmitListener(this);
	var firstVarName = this.getFirstVarName(variablesToDisplay);
	if (optimized && this.m_orcaFunctions.supportsStoryFilterOptimization(firstVarName))
	{
		this.m_orcaFunctions.performStoryFilterOptimizationWorkflow(firstVarName);
	}
	else if (oFF.notNull(this.m_orcaToken))
	{
		this.m_orcaToken.buildUiOnControl(anchor);
	}
	else if (oFF.notNull(this.m_orcaDialog))
	{
		this.m_orcaDialog.open();
	}
};
oFF.Gyros.prototype.getFirstVarName = function(varNames)
{
	if (oFF.XCollectionUtils.hasElements(varNames))
	{
		var it = varNames.getIterator();
		var varName = it.next();
		oFF.XObjectExt.release(it);
		if (oFF.notNull(varName))
		{
			return varName;
		}
	}
	return this.getVariableProcessor().getInputEnabledAndNonTechnicalVariables().get(0).getName();
};
oFF.Gyros.prototype.createLinkTooltips = function()
{
	var variablesWithLink = oFF.XHashMapByString.create();
	var selectedItems2 = this.m_linkMcb.getSelectedItems();
	for (var i = 0; i < selectedItems2.size(); i++)
	{
		var varName = oFF.XStringUtils.concatenate2("varNamePlaceholder", oFF.XInteger.convertToString(i));
		var modelName = oFF.XStringUtils.concatenate2("modelNamePlaceholder", oFF.XInteger.convertToString(i));
		var tooltipLines = oFF.XCollectionUtils.singletonList(oFF.XPairOfString.create(varName, modelName));
		variablesWithLink.put(selectedItems2.get(i).getName(), tooltipLines);
	}
	var keys = this.m_linkage.getKeysAsIteratorOfString();
	while (keys.hasNext())
	{
		var nextVarName = keys.next();
		variablesWithLink.put(nextVarName, oFF.XCollectionUtils.singletonList(oFF.XPairOfString.create(nextVarName, "modelNamePlaceholder")));
	}
	return variablesWithLink;
};
oFF.Gyros.prototype.onChange = function(event)
{
	this.updateState();
};
oFF.Gyros.prototype.updateState = function()
{
	if (this.m_defaultRb.isSelected())
	{
		this.m_noneRb.setSelected(true);
		this.m_uqmCb.setChecked(false);
	}
	if (!this.m_storyRb.isSelected() && (this.m_explorerRb.isSelected() || this.m_filterRb.isSelected()))
	{
		this.m_noneRb.setSelected(true);
	}
	this.m_chartRb.setEnabled(!this.m_defaultRb.isSelected());
	this.m_tableRb.setEnabled(!this.m_defaultRb.isSelected());
	this.m_explorerRb.setEnabled(this.m_storyRb.isSelected());
	this.m_filterRb.setEnabled(this.m_storyRb.isSelected());
	this.m_linkMcb.setEnabled(!this.m_defaultRb.isSelected());
	this.m_storyTa.setEnabled(!this.m_defaultRb.isSelected());
	this.m_widgetTa.setEnabled(!this.m_defaultRb.isSelected());
	this.m_sacDataTa.setEnabled(!this.m_defaultRb.isSelected());
	this.m_uqmCb.setEnabled(!this.m_defaultRb.isSelected());
};
oFF.Gyros.prototype.getVariableProcessor = function()
{
	if (oFF.notNull(this.m_variableProcessor))
	{
		return this.m_variableProcessor;
	}
	if (this.m_options.getBooleanValue(oFF.Gyros.PROPERTY_USE_OLAP_ENV))
	{
		return this.m_queryManager.getOlapEnv().getVariableProcessor();
	}
	return this.m_queryManager;
};
oFF.Gyros.prototype.getQueryManager = function()
{
	return this.m_queryManager;
};
oFF.Gyros.prototype.setLinkage = function(linkage)
{
	this.m_linkage = linkage;
};
oFF.Gyros.prototype.onPress = function(event)
{
	var control = event.getControl();
	if (control === this.m_openBtn)
	{
		if (oFF.notNull(this.m_tokenPopover) && this.m_tokenPopover.isOpen())
		{
			this.m_tokenPopover.close();
			return;
		}
		if (this.m_filterRb.isSelected())
		{
			this.m_tokenPopover = this.getUiManager().newControl(oFF.UiType.POPOVER);
			this.m_tokenPopover.openAt(this.m_openBtn);
			this.m_tokenPopover.setWidthCss("800px");
			this.m_tokenPopover.setPaddingCss("8px");
			this.m_tokenPopover.registerOnAfterClose(this);
			this.showVariablePrompt(this.m_tokenPopover, false);
		}
		else
		{
			this.showVariablePrompt(null, false);
		}
	}
	else if (control === this.m_optimizedBtn)
	{
		this.showVariablePrompt(null, true);
	}
	else if (control === this.m_optionsIcon)
	{
		this.openOptionsDialog();
	}
	else if (control === this.m_changeDsBtn)
	{
		this.openDatasourcePickerDialog();
	}
	else if (control === this.m_editToggleBtn)
	{
		oFF.XObjectExt.release(this.m_featureDialog);
		this.m_featureDialog = oFF.UiFeatureToggleDialog.createFeatureDialog(this.getSession(), this.getUiManager(), this);
		this.m_featureDialog.open();
	}
	else if (control === this.m_mobileValueHelpBtn)
	{
		this.createMobileValueHelpMenu(control);
	}
	else if (control.getUiType() === oFF.UiType.MENU_ITEM && oFF.XString.isEqual(control.getParent().getName(), "gyrosMobileValueHelpMenu"))
	{
		this.handleMobileValueHelpMenuItemPress(control);
	}
};
oFF.Gyros.prototype.onAfterClose = function(event)
{
	this.m_tokenPopover = oFF.XObjectExt.release(this.m_tokenPopover);
	if (oFF.notNull(this.m_vdToken))
	{
		this.m_vdToken.attemptSubmit();
	}
	else if (oFF.notNull(this.m_orcaToken))
	{
		this.m_orcaToken.attemptSubmit();
	}
};
oFF.Gyros.prototype.openOptionsDialog = function()
{
	if (oFF.isNull(this.m_optionsPopover))
	{
		this.m_optionsPopover = this.getUiManager().newControl(oFF.UiType.POPOVER);
		this.m_optionsPopover.setWidthCss("320px");
		this.m_optionsPopover.setPaddingCss("15px");
		this.m_options.buildUi(oFF.UiGenesis.create(this.m_optionsPopover, oFF.UiPosition.CONTENT, oFF.UiOperation.SET, 0, 0));
	}
	this.m_optionsPopover.openAt(this.m_optionsIcon);
};
oFF.Gyros.prototype.openDatasourcePickerDialog = function()
{
	var appStoreDlgManifest = oFF.ProgramRegistration.getProgramManifest(oFF.AuDatasourcePicker.DEFAULT_PROGRAM_NAME);
	var appStoreDlgStartCfg = oFF.ProgramStartCfg.create(this.getProcess(), appStoreDlgManifest.getName(), null, null);
	var tmpArgs = appStoreDlgStartCfg.getArguments();
	tmpArgs.putXObject(oFF.AuDatasourcePicker.PARAM_APPLICATION, this.getApplication());
	tmpArgs.getArgumentStructure().putString(oFF.AuDatasourcePicker.PARAM_SYSTEM, this.m_system);
	tmpArgs.putXObject(oFF.AuDatasourcePicker.PARAM_LISTENER, this);
	appStoreDlgStartCfg.setParentProcess(this.getProcess());
	appStoreDlgStartCfg.setIsCreatingChildProcess(true);
	appStoreDlgStartCfg.processExecution(oFF.SyncType.NON_BLOCKING, null, null);
};
oFF.Gyros.prototype.onSelectionChange = function(event)
{
	this.m_linkage = oFF.XHashMapByString.create();
};
oFF.Gyros.prototype.onBeforeSubmit = function(values, valuesJson) {};
oFF.Gyros.prototype.onAfterSubmit = function(success, extResult, values, valuesJson)
{
	var varProcessor = this.getVariableProcessor();
	var allValues = values;
	if (this.m_options.getBooleanValue(oFF.Gyros.PROPERTY_FUNCTIONAL_VALUES))
	{
		allValues = oFF.VdImportExport.getValuesFromProcessor(varProcessor);
	}
	var _export = oFF.VdOrcaValueParser.exportVariables(varProcessor, allValues, this.m_linkage.getKeysAsReadOnlyListOfString());
	if (oFF.notNull(_export))
	{
		if (oFF.notNull(this.m_orcaFunctions) && this.m_orcaFunctions.isWidgetSelected())
		{
			this.m_widgetTa.setText(oFF.PrUtils.serialize(_export, true, true, 4));
		}
		else
		{
			this.m_storyTa.setText(oFF.PrUtils.serialize(_export, true, true, 4));
		}
	}
};
oFF.Gyros.prototype.onOk = function()
{
	if (oFF.notNull(this.m_orcaFunctions))
	{
		this.m_forcePrompt = this.m_orcaFunctions.isForcePrompt();
		this.m_disableExitVariables = this.m_orcaFunctions.isDisablingExitVariables();
		if (this.m_chartRb.isSelected() || this.m_tableRb.isSelected() || this.m_explorerRb.isSelected())
		{
			this.m_disableDynamicVariablesInWidget = this.m_orcaFunctions.isDisablingDynamicVariables();
		}
		else
		{
			this.m_disableDynamicVariablesInStory = this.m_orcaFunctions.isDisablingDynamicVariables();
		}
	}
	if (oFF.notNull(this.m_queryManager) && this.m_queryManager.supportsDirectVariableTransfer())
	{
		this.m_queryManager.processQueryExecution(oFF.SyncType.BLOCKING, null, null);
	}
};
oFF.Gyros.prototype.onCancel = function() {};
oFF.Gyros.prototype.onDatasourceSelected = function(dataSource)
{
	if (oFF.isNull(dataSource))
	{
		return;
	}
	this.m_system = dataSource.getSystemName();
	this.m_datasource = dataSource.getFullQualifiedName();
	this.m_planningSequence = null;
	oFF.XObjectExt.release(this.m_queryManager);
	oFF.XObjectExt.release(this.m_variableProcessor);
	this.setupDatasource();
	this.setupUi();
};
oFF.Gyros.prototype.onFeatureToggleDialogClose = function(selectedToggles)
{
	if (oFF.isNull(selectedToggles))
	{
		return;
	}
	var session = this.getSession();
	session.clearAllFeatureToggles();
	session.activateFeatureToggleSet(selectedToggles);
	oFF.XObjectExt.release(this.m_queryManager);
	oFF.XObjectExt.release(this.m_variableProcessor);
	this.setupDatasource();
	this.setupUi();
};
oFF.Gyros.prototype.getScenario = function()
{
	if (this.m_storyRb.isSelected())
	{
		return oFF.VdOrcaScenario.STORY;
	}
	if (this.m_appRb.isSelected())
	{
		return oFF.VdOrcaScenario.ANALYTIC_APP;
	}
	if (this.m_brRb.isSelected())
	{
		return oFF.VdOrcaScenario.BOARD_ROOM;
	}
	return null;
};
oFF.Gyros.prototype.getLevel = function()
{
	if (this.m_tableRb.isSelected())
	{
		return oFF.VdOrcaLevel.TABLE;
	}
	if (this.m_chartRb.isSelected())
	{
		return oFF.VdOrcaLevel.CHART;
	}
	if (this.m_explorerRb.isSelected())
	{
		return oFF.VdOrcaLevel.EXPLORER;
	}
	if (this.m_filterRb.isSelected())
	{
		return oFF.VdOrcaLevel.FILTER;
	}
	return oFF.VdOrcaLevel.DEFAULT;
};
oFF.Gyros.prototype.isBw = function()
{
	if (this.m_isPlanningSequence)
	{
		return true;
	}
	return oFF.notNull(this.m_queryManager) && this.m_queryManager.getSystemType().isTypeOf(oFF.SystemType.ABAP);
};
oFF.Gyros.prototype.createMobileValueHelpMenu = function(mobileValueHelpBtn)
{
	var mobileValueHelpMenu = this.m_genesis.newControl(oFF.UiType.MENU);
	mobileValueHelpMenu.setName("gyrosMobileValueHelpMenu");
	mobileValueHelpMenu.addNewItem().setName("gyrosMobileValueHelpCalendarSingle").setText("Calendar Single").setIcon("value-help").registerOnPress(this);
	mobileValueHelpMenu.addNewItem().setName("gyrosMobileValueHelpCalendarRange").setText("Calendar Range").setIcon("value-help").registerOnPress(this);
	mobileValueHelpMenu.addNewItem().setName("gyrosMobileValueHelpOperatorList").setText("Operator List").setIcon("value-help").registerOnPress(this);
	mobileValueHelpMenu.addNewItem().setName("gyrosMobileValueHelpSimpleList").setText("Simple List").setIcon("value-help").registerOnPress(this);
	mobileValueHelpMenu.addNewItem().setName("gyrosMobileValueHelpMemberSelector").setText("Member Selector").setIcon("value-help").registerOnPress(this);
	mobileValueHelpMenu.addNewItem().setName("gyrosMobileValueHelpOperatorWorkflow").setText("Operator Workflow").setIcon("value-help").registerOnPress(this);
	mobileValueHelpMenu.openAt(mobileValueHelpBtn);
};
oFF.Gyros.prototype.getFirstVarFromQueryManager = function()
{
	if (this.getQueryManager() !== null)
	{
		if (this.getQueryManager().hasVariables())
		{
			return this.getQueryManager().getVariables().get(1);
		}
		this.getGenesis().showWarningToast("The specified data source has no variables!");
		return null;
	}
	this.getGenesis().showErrorToast("No data source specified!");
	return null;
};
oFF.Gyros.prototype.handleMobileValueHelpMenuItemPress = function(menuItem)
{
	var firstVar = null;
	switch (menuItem.getName())
	{
		case "gyrosMobileValueHelpCalendarSingle":
			oFF.VdVhMobileTester.testCalendarSingle(this.getApplication());
			break;

		case "gyrosMobileValueHelpCalendarRange":
			oFF.VdVhMobileTester.testCalendarRange(this.getApplication());
			break;

		case "gyrosMobileValueHelpOperatorList":
			oFF.VdVhMobileTester.testOperatorList(this.getApplication());
			break;

		case "gyrosMobileValueHelpSimpleList":
			oFF.VdVhMobileTester.testSimpleList(this.getApplication());
			break;

		case "gyrosMobileValueHelpMemberSelector":
			firstVar = this.getFirstVarFromQueryManager();
			if (oFF.notNull(firstVar))
			{
				oFF.VdVhMobileTester.testMemberSelector(this.getApplication(), firstVar);
			}
			break;

		case "gyrosMobileValueHelpOperatorWorkflow":
			firstVar = this.getFirstVarFromQueryManager();
			if (oFF.notNull(firstVar))
			{
				oFF.VdVhMobileTester.testOperatorWorkflow(this.getApplication(), firstVar);
			}
			break;

		default:
	}
};

oFF.QvKratos = function() {};
oFF.QvKratos.prototype = new oFF.DfUiProgram();
oFF.QvKratos.prototype._ff_c = "QvKratos";

oFF.QvKratos.DEFAULT_PROGRAM_NAME = "Kratos";
oFF.QvKratos.createRunner = function()
{
	var runner = oFF.KernelBoot.createByName(oFF.QvKratos.DEFAULT_PROGRAM_NAME);
	return runner;
};
oFF.QvKratos.createNewMetis = function()
{
	var prg = new oFF.QvKratos();
	prg.setup();
	return prg;
};
oFF.QvKratos.prototype.m_queryName = null;
oFF.QvKratos.prototype.m_queryManager = null;
oFF.QvKratos.prototype.newProgram = function()
{
	var prg = new oFF.QvKratos();
	prg.setup();
	return prg;
};
oFF.QvKratos.prototype.doSetupProgramMetadata = function(metadata)
{
	oFF.DfUiProgram.prototype.doSetupProgramMetadata.call( this , metadata);
};
oFF.QvKratos.prototype.evalArguments = function()
{
	oFF.DfUiProgram.prototype.evalArguments.call( this );
};
oFF.QvKratos.prototype.initializeProgram = function()
{
	oFF.DfUiProgram.prototype.initializeProgram.call( this );
	this.setupInternal();
};
oFF.QvKratos.prototype.releaseObject = function()
{
	oFF.DfUiProgram.prototype.releaseObject.call( this );
	this.m_queryManager = oFF.XObjectExt.release(this.m_queryManager);
};
oFF.QvKratos.prototype.getLogSeverity = function()
{
	return oFF.Severity.PRINT;
};
oFF.QvKratos.prototype.isShowMenuBar = function()
{
	return true;
};
oFF.QvKratos.prototype.getDefaultWindowSize = function()
{
	return oFF.UiSizeValue.createByCss("60vw", "60vh");
};
oFF.QvKratos.prototype.getDefaultProgramName = function()
{
	return oFF.QvKratos.DEFAULT_PROGRAM_NAME;
};
oFF.QvKratos.prototype.setupInternal = function() {};
oFF.QvKratos.prototype.buildUi = function(genesis)
{
	oFF.DfUiProgram.prototype.buildUi.call( this , genesis);
	var startLayout = genesis.newControl(oFF.UiType.FLEX_LAYOUT);
	startLayout.setName("sleMetisMainLayout");
	startLayout.useMaxSpace();
	startLayout.setDirection(oFF.UiFlexDirection.ROW);
	startLayout.setAlignItems(oFF.UiFlexAlignItems.CENTER);
	startLayout.setJustifyContent(oFF.UiFlexJustifyContent.CENTER);
	startLayout.setWrap(oFF.UiFlexWrap.NO_WRAP);
	startLayout.setBackgroundColor(oFF.UiColor.createByString("#f9fafc"));
	var selectQueryBtn = startLayout.addNewItemOfType(oFF.UiType.BUTTON);
	selectQueryBtn.setName("selectQueryBtn");
	selectQueryBtn.setText("Select Query");
	selectQueryBtn.registerOnPress(this);
	genesis.setRoot(startLayout);
	this.addMenuBarButton("qvKratosToolbarQueryBtn", null, "Query", null, this);
	this.addMenuBarButton("qvKratosToolbarVariableDialogBtn", null, "Variable Dialog", null, this).setEnabled(false);
};
oFF.QvKratos.prototype.showQuerySelectionDialog = function()
{
	oFF.OqdController.create(this.getApplication(), this.getUiManager(), this).open();
};
oFF.QvKratos.prototype.showVariableDialogForcurrentQuery = function()
{
	var entryPoint = oFF.VdUqmEntryPoint.createEntryPoint(this.m_queryName, this.m_queryManager.getOlapEnv().getVariableProcessor(), this);
	entryPoint.open();
};
oFF.QvKratos.prototype.createQueryManager = function(systemName, queryName, fullQueryName)
{
	this.showLoadingIndicator();
	this.m_queryName = queryName;
	var qc = oFF.QueryServiceConfig.createWithDataSourceName(this.getApplication(), systemName, fullQueryName);
	qc.processQueryManagerCreation(oFF.SyncType.NON_BLOCKING, this, null);
};
oFF.QvKratos.prototype.createQueryUi = function()
{
	if (oFF.isNull(this.m_queryManager))
	{
		this.getGenesis().showErrorToast("Missing Query Manager! Something went wrong!");
		return;
	}
	var toolBarBtn = this.getMenuBar().getItemByName("qvKratosToolbarVariableDialogBtn");
	if (this.m_queryManager.getQueryModel().hasVariables())
	{
		toolBarBtn.setEnabled(true);
	}
	else
	{
		toolBarBtn.setEnabled(false);
	}
	var mainTabBar = this.m_genesis.newControl(oFF.UiType.TAB_STRIP);
	mainTabBar.setName("mainTabBar");
	this.createSheetDefinitionTab(mainTabBar);
	this.createVariablesTab(mainTabBar);
	this.m_genesis.setRoot(mainTabBar);
};
oFF.QvKratos.prototype.showLoadingIndicator = function()
{
	this.m_genesis.clearUi();
	var toolBarBtn = this.getMenuBar().getItemByName("qvKratosToolbarVariableDialogBtn");
	toolBarBtn.setEnabled(false);
	var activityIndicator = this.m_genesis.newControl(oFF.UiType.ACTIVITY_INDICATOR);
	activityIndicator.useMaxSpace();
	this.m_genesis.setRoot(activityIndicator);
};
oFF.QvKratos.prototype.addNewTabLayout = function(tabStrip, text, icon, name)
{
	var newTab = tabStrip.addNewItem();
	newTab.setName(name);
	newTab.setText(text);
	newTab.setIcon(icon);
	var tabLayout = newTab.setNewContent(oFF.UiType.FLEX_LAYOUT);
	tabLayout.setDirection(oFF.UiFlexDirection.ROW);
	return tabLayout;
};
oFF.QvKratos.prototype.addNewListLayout = function(layout, title, name)
{
	var tmpVerticalLayout = layout.addNewItemOfType(oFF.UiType.VERTICAL_LAYOUT);
	var listTitle = tmpVerticalLayout.addNewItemOfType(oFF.UiType.LABEL);
	listTitle.setText(title);
	var listScrollContainer = tmpVerticalLayout.addNewItemOfType(oFF.UiType.SCROLL_CONTAINER);
	var tmpList = listScrollContainer.setNewContent(oFF.UiType.LIST);
	tmpList.setName(name);
	tmpList.setSelectionMode(oFF.UiSelectionMode.NONE);
	return tmpList;
};
oFF.QvKratos.prototype.createSheetDefinitionTab = function(tabBar)
{
	var sheetDefinitionLayout = this.addNewTabLayout(tabBar, "Sheet Definition", "document-text", "sheetDefinitionTab");
	var columnsList = this.addNewListLayout(sheetDefinitionLayout, "Columns", "columnsList");
	var rowsList = this.addNewListLayout(sheetDefinitionLayout, "Rows", "rowsList");
	var freeList = this.addNewListLayout(sheetDefinitionLayout, "Free", "freeList");
	var columnsAxis = this.m_queryManager.getQueryModel().getColumnsAxis();
	var colAxisDimList = columnsAxis.getDimensions();
	var colAxisDimIterator = colAxisDimList.getIterator();
	while (colAxisDimIterator.hasNext())
	{
		var tmpColDim = colAxisDimIterator.next();
		var colDimListItem = columnsList.addNewItem();
		colDimListItem.setText(tmpColDim.getText());
		colDimListItem.setDescription(tmpColDim.getName());
	}
	var rowsAxis = this.m_queryManager.getQueryModel().getRowsAxis();
	var rowAxisDimList = rowsAxis.getDimensions();
	var rowAxisDimIterator = rowAxisDimList.getIterator();
	while (rowAxisDimIterator.hasNext())
	{
		var tmpRowDim = rowAxisDimIterator.next();
		var rowDimListItem = rowsList.addNewItem();
		rowDimListItem.setText(tmpRowDim.getText());
		rowDimListItem.setDescription(tmpRowDim.getName());
	}
	var freeAxis = this.m_queryManager.getQueryModel().getFreeAxis();
	var freeAxisDimList = freeAxis.getDimensions();
	var freeAxisDimIterator = freeAxisDimList.getIterator();
	while (freeAxisDimIterator.hasNext())
	{
		var tmpFreeDim = freeAxisDimIterator.next();
		var freeDimListItem = freeList.addNewItem();
		freeDimListItem.setText(tmpFreeDim.getText());
		freeDimListItem.setDescription(tmpFreeDim.getName());
	}
};
oFF.QvKratos.prototype.createVariablesTab = function(tabBar)
{
	var variablesLayout = this.addNewTabLayout(tabBar, "Variables", "request", "variablesTab");
	var variablesList = this.addNewListLayout(variablesLayout, "Variables", "variablesList");
	var varList = this.m_queryManager.getQueryModel().getVariables();
	var varIterator = varList.getIterator();
	while (varIterator.hasNext())
	{
		var tmpVariable = varIterator.next();
		var varListItem = variablesList.addNewItem();
		varListItem.setText(tmpVariable.getText());
		varListItem.setDescription(tmpVariable.getVariableType().getName());
	}
};
oFF.QvKratos.prototype.onPress = function(event)
{
	oFF.DfUiProgram.prototype.onPress.call( this , event);
	var control = event.getControl();
	var controlParent = control.getParent();
	if (oFF.notNull(controlParent) && controlParent.getUiType() === oFF.UiType.TOOLBAR)
	{
		switch (event.getControl().getName())
		{
			case "qvKratosToolbarQueryBtn":
				this.showQuerySelectionDialog();
				break;

			case "qvKratosToolbarVariableDialogBtn":
				this.showVariableDialogForcurrentQuery();
				break;

			default:
		}
	}
	if (control.getUiType() === oFF.UiType.BUTTON && oFF.XString.isEqual(control.getName(), "selectQueryBtn"))
	{
		this.showQuerySelectionDialog();
	}
};
oFF.QvKratos.prototype.onQuerySelectCancel = function() {};
oFF.QvKratos.prototype.onQuerySelect = function(systemName, queryName, fullQueryName)
{
	this.createQueryManager(systemName, queryName, fullQueryName);
};
oFF.QvKratos.prototype.onQueryManagerCreated = function(extResult, queryManager, customIdentifier)
{
	if (extResult.isValid())
	{
		this.m_queryManager = extResult.getData();
		this.createQueryUi();
	}
	if (extResult.hasErrors())
	{
		throw oFF.XException.createRuntimeException(extResult.getSummary());
	}
};
oFF.QvKratos.prototype.onOk = function() {};
oFF.QvKratos.prototype.onCancel = function() {};

oFF.StdAidos = function() {};
oFF.StdAidos.prototype = new oFF.DfUiProgram();
oFF.StdAidos.prototype._ff_c = "StdAidos";

oFF.StdAidos.DEFAULT_PROGRAM_NAME = "Aidos";
oFF.StdAidos.AIDOS_DEFAULT_QUERY_NAME_KEY = "aidos_defaultQueryName";
oFF.StdAidos.AIDOS_DEFAULT_SYSTEM_NAME_KEY = "aidos_defaultSystemName";
oFF.StdAidos.AIDOS_DEFAULT_FULL_QUERY_NAME_KEY = "aidos_defaultFullQueryName";
oFF.StdAidos.createRunner = function()
{
	var runner = oFF.KernelBoot.createByName(oFF.StdAidos.DEFAULT_PROGRAM_NAME);
	return runner;
};
oFF.StdAidos.createNewMetis = function()
{
	var prg = new oFF.StdAidos();
	prg.setup();
	return prg;
};
oFF.StdAidos.prototype.m_sacTable = null;
oFF.StdAidos.prototype.m_dataSourceNameLbl = null;
oFF.StdAidos.prototype.m_queryName = null;
oFF.StdAidos.prototype.m_systemName = null;
oFF.StdAidos.prototype.m_fullQueryName = null;
oFF.StdAidos.prototype.newProgram = function()
{
	var prg = new oFF.StdAidos();
	prg.setup();
	return prg;
};
oFF.StdAidos.prototype.doSetupProgramMetadata = function(metadata)
{
	oFF.DfUiProgram.prototype.doSetupProgramMetadata.call( this , metadata);
};
oFF.StdAidos.prototype.evalArguments = function()
{
	oFF.DfUiProgram.prototype.evalArguments.call( this );
};
oFF.StdAidos.prototype.initializeProgram = function()
{
	oFF.DfUiProgram.prototype.initializeProgram.call( this );
	this.setupInternal();
};
oFF.StdAidos.prototype.releaseObject = function()
{
	this.m_sacTable = oFF.XObjectExt.release(this.m_sacTable);
	oFF.DfUiProgram.prototype.releaseObject.call( this );
};
oFF.StdAidos.prototype.getLogSeverity = function()
{
	return oFF.Severity.PRINT;
};
oFF.StdAidos.prototype.isShowMenuBar = function()
{
	return true;
};
oFF.StdAidos.prototype.getDefaultWindowSize = function()
{
	return oFF.UiSizeValue.createByCss("75vw", "60vh");
};
oFF.StdAidos.prototype.getDefaultProgramName = function()
{
	return oFF.StdAidos.DEFAULT_PROGRAM_NAME;
};
oFF.StdAidos.prototype.setupInternal = function()
{
	this.m_queryName = this.getApplication().getUserManager().getUserSettings().getStringByKeyExt(oFF.StdAidos.AIDOS_DEFAULT_QUERY_NAME_KEY, "");
	this.m_systemName = this.getApplication().getUserManager().getUserSettings().getStringByKeyExt(oFF.StdAidos.AIDOS_DEFAULT_SYSTEM_NAME_KEY, "");
	this.m_fullQueryName = this.getApplication().getUserManager().getUserSettings().getStringByKeyExt(oFF.StdAidos.AIDOS_DEFAULT_FULL_QUERY_NAME_KEY, "");
};
oFF.StdAidos.prototype.buildUi = function(genesis)
{
	oFF.DfUiProgram.prototype.buildUi.call( this , genesis);
	var mainLayout = genesis.newControl(oFF.UiType.FLEX_LAYOUT);
	mainLayout.setName("stGridDemoMainLayout");
	mainLayout.useMaxSpace();
	mainLayout.setDirection(oFF.UiFlexDirection.COLUMN);
	mainLayout.setAlignItems(oFF.UiFlexAlignItems.CENTER);
	mainLayout.setJustifyContent(oFF.UiFlexJustifyContent.CENTER);
	mainLayout.setWrap(oFF.UiFlexWrap.NO_WRAP);
	mainLayout.setBackgroundColor(oFF.UiColor.createByString("#f9fafc"));
	var titleSection = mainLayout.addNewItemOfType(oFF.UiType.FLEX_LAYOUT);
	titleSection.setName("stGridDemoMainLayout");
	titleSection.setWidthCss("100%");
	titleSection.setHeightCss("22px");
	titleSection.setMarginCss("10px");
	titleSection.setDirection(oFF.UiFlexDirection.ROW);
	titleSection.setAlignItems(oFF.UiFlexAlignItems.CENTER);
	titleSection.setJustifyContent(oFF.UiFlexJustifyContent.CENTER);
	titleSection.setWrap(oFF.UiFlexWrap.NO_WRAP);
	var dataSourceLbl = titleSection.addNewItemOfType(oFF.UiType.LABEL);
	dataSourceLbl.setName("dataSourceLabel");
	dataSourceLbl.setText("Data source: ");
	dataSourceLbl.setFontSizeCss("18px");
	titleSection.addNewItemOfType(oFF.UiType.SPACER).setWidthCss("5px");
	this.m_dataSourceNameLbl = titleSection.addNewItemOfType(oFF.UiType.LABEL);
	this.m_dataSourceNameLbl.setName("dataSourceNameLabel");
	this.m_dataSourceNameLbl.setText("table mock data");
	this.m_dataSourceNameLbl.setFontWeight(oFF.UiFontWeight.BOLD);
	this.m_dataSourceNameLbl.setFontSizeCss("18px");
	this.m_sacTable = mainLayout.addNewItemOfType(oFF.UiType.SAC_TABLE_GRID);
	this.m_sacTable.setName("sacTableGrid");
	this.m_sacTable.setWidthCss("100%");
	this.m_sacTable.setHeightCss("100%");
	this.m_sacTable.registerOnClick(this);
	this.m_sacTable.registerOnContextMenu(this);
	this.m_sacTable.registerOnSelectionChange(this);
	this.m_sacTable.registerOnButtonPress(this);
	genesis.setRoot(mainLayout);
	this.addMenuBarButton("stdAidosJsonModelBtn", null, "JSON Model", "table-view", this);
	this.addMenuBarButton("stdAidosRenderQueryBtn", null, "Render Query", "media-play", this);
	this.addMenuBarButton("stdAidosDefaultQueryBtn", null, "Default Query", null, this);
	if (oFF.XStringUtils.isNotNullAndNotEmpty(this.m_queryName) && oFF.XStringUtils.isNotNullAndNotEmpty(this.m_systemName) && oFF.XStringUtils.isNotNullAndNotEmpty(this.m_fullQueryName))
	{
		this.createQueryManager(this.m_systemName, this.m_queryName, this.m_fullQueryName);
	}
};
oFF.StdAidos.prototype.showJsonEntryDialog = function()
{
	var curText = "";
	if (this.m_sacTable.getModelJson() !== null)
	{
		curText = oFF.PrUtils.serialize(this.m_sacTable.getModelJson(), false, true, 2);
	}
	oFF.SuTextEntryDialog.createDialog(this.m_genesis, "SAC Table json", "json", curText, this).openDialog();
};
oFF.StdAidos.prototype.showQuerySelectionDialog = function()
{
	oFF.OqdController.create(this.getApplication(), this.getUiManager(), this).open();
};
oFF.StdAidos.prototype.showLoadingIndicator = function()
{
	this.setBusy(true);
};
oFF.StdAidos.prototype.hideLoadingIndicator = function()
{
	this.setBusy(false);
};
oFF.StdAidos.prototype.setDataSourceName = function(name)
{
	if (oFF.notNull(this.m_dataSourceNameLbl))
	{
		this.m_dataSourceNameLbl.setText(name);
	}
};
oFF.StdAidos.prototype.updateTableData = function(sourceName, modelJson)
{
	this.m_sacTable.setModelJson(modelJson);
	this.hideLoadingIndicator();
	this.setDataSourceName(sourceName);
};
oFF.StdAidos.prototype.createDefaultQueryMenu = function(queryMenuBtn)
{
	var queryToolbarMenu = this.m_genesis.newControl(oFF.UiType.MENU);
	queryToolbarMenu.setName("queryToolbarMenu");
	queryToolbarMenu.setTag("queryToolbarMenu");
	queryToolbarMenu.addNewItem().setName("queryToolbarMenuSetAsDefault").setText("Set current query as default").setIcon("favorite").registerOnPress(this).setEnabled(oFF.XStringUtils.isNotNullAndNotEmpty(this.m_fullQueryName));
	queryToolbarMenu.addNewItem().setName("queryToolbarMenuClearDefault").setText("Clear default query").setIcon("unfavorite").registerOnPress(this);
	queryToolbarMenu.openAt(queryMenuBtn);
};
oFF.StdAidos.prototype.setCurrentQueryAsDefault = function()
{
	this.getApplication().getUserManager().getUserSettings().putString(oFF.StdAidos.AIDOS_DEFAULT_QUERY_NAME_KEY, this.m_queryName);
	this.getApplication().getUserManager().getUserSettings().putString(oFF.StdAidos.AIDOS_DEFAULT_SYSTEM_NAME_KEY, this.m_systemName);
	this.getApplication().getUserManager().getUserSettings().putString(oFF.StdAidos.AIDOS_DEFAULT_FULL_QUERY_NAME_KEY, this.m_fullQueryName);
	this.getGenesis().showInfoToast(oFF.XStringUtils.concatenate3("Query: ", this.m_queryName, " saved as default!"));
};
oFF.StdAidos.prototype.clearDefaultQuery = function()
{
	this.getApplication().getUserManager().getUserSettings().removeKey(oFF.StdAidos.AIDOS_DEFAULT_QUERY_NAME_KEY);
	this.getApplication().getUserManager().getUserSettings().removeKey(oFF.StdAidos.AIDOS_DEFAULT_SYSTEM_NAME_KEY);
	this.getApplication().getUserManager().getUserSettings().removeKey(oFF.StdAidos.AIDOS_DEFAULT_FULL_QUERY_NAME_KEY);
	this.getGenesis().showInfoToast("Cleared default query!");
};
oFF.StdAidos.prototype.updateSacTableWithJson = function(jsonStr)
{
	if (oFF.XStringUtils.isNotNullAndNotEmpty(jsonStr))
	{
		this.showLoadingIndicator();
		var parser = oFF.JsonParserFactory.newInstance();
		var proxyDocument = parser.parse(jsonStr);
		this.updateTableData("JSON", proxyDocument);
		this.m_systemName = "";
		this.m_queryName = "";
		this.m_fullQueryName = "";
	}
};
oFF.StdAidos.prototype.createQueryManager = function(systemName, queryName, fullQueryName)
{
	this.showLoadingIndicator();
	this.m_systemName = systemName;
	this.m_queryName = queryName;
	this.m_fullQueryName = fullQueryName;
	var qc = oFF.QueryServiceConfig.createWithDataSourceName(this.getApplication(), systemName, fullQueryName);
	qc.processQueryManagerCreation(oFF.SyncType.NON_BLOCKING, this, null);
};
oFF.StdAidos.prototype.updateSacTableWithQuery = function(queryManager)
{
	var resultSet = this.getCursorResultSet(queryManager);
	var modelJson = oFF.GridRendererFactory.createRenderer(oFF.ProtocolBindingType.SAC_TABLE_GRID).render(resultSet);
	this.updateTableData(oFF.XStringUtils.concatenate3(this.m_systemName, ": ", this.m_queryName), modelJson);
};
oFF.StdAidos.prototype.getCursorResultSet = function(queryManager)
{
	var resultSet = null;
	var resultSetContainer = queryManager.getActiveResultSetContainer();
	if (oFF.isNull(resultSetContainer))
	{
		this.queryLoadingError("ResultSetContainer null");
	}
	else if (resultSetContainer.hasErrors())
	{
		this.queryLoadingError(resultSetContainer.getSummary());
	}
	else
	{
		resultSet = resultSetContainer.getCursorResultSet();
		if (oFF.isNull(resultSet))
		{
			if (resultSetContainer.hasErrors())
			{
				this.queryLoadingError(resultSetContainer.getSummary());
			}
			else
			{
				this.queryLoadingError("ResultSet null");
			}
		}
		else if (resultSet.hasErrors())
		{
			this.queryLoadingError(resultSet.getSummary());
		}
	}
	return resultSet;
};
oFF.StdAidos.prototype.queryLoadingError = function(message)
{
	this.hideLoadingIndicator();
	this.setDataSourceName("Error");
	this.getGenesis().showErrorToast(message);
	this.m_systemName = "";
	this.m_queryName = "";
	this.m_fullQueryName = "";
	throw oFF.XException.createRuntimeException(message);
};
oFF.StdAidos.prototype.onPress = function(event)
{
	oFF.DfUiProgram.prototype.onPress.call( this , event);
	var control = event.getControl();
	var controlParent = control.getParent();
	if (oFF.notNull(controlParent) && controlParent.getUiType() === oFF.UiType.TOOLBAR && oFF.XString.isEqual(control.getName(), "stdAidosDefaultQueryBtn"))
	{
		this.createDefaultQueryMenu(control);
	}
	if (oFF.notNull(controlParent) && controlParent.getUiType() === oFF.UiType.TOOLBAR)
	{
		switch (event.getControl().getName())
		{
			case "stdAidosJsonModelBtn":
				this.showJsonEntryDialog();
				break;

			case "stdAidosRenderQueryBtn":
				this.showQuerySelectionDialog();
				break;

			default:
		}
	}
	if (oFF.notNull(controlParent) && controlParent.getUiType() === oFF.UiType.MENU)
	{
		switch (control.getName())
		{
			case "queryToolbarMenuSetAsDefault":
				this.setCurrentQueryAsDefault();
				break;

			case "queryToolbarMenuClearDefault":
				this.clearDefaultQuery();
				break;

			default:
		}
	}
};
oFF.StdAidos.prototype.onTextEntryCancel = function() {};
oFF.StdAidos.prototype.onTextEntryFinished = function(text)
{
	this.updateSacTableWithJson(text);
};
oFF.StdAidos.prototype.onQuerySelectCancel = function() {};
oFF.StdAidos.prototype.onQuerySelect = function(systemName, queryName, fullQueryName)
{
	this.createQueryManager(systemName, queryName, fullQueryName);
};
oFF.StdAidos.prototype.onQueryManagerCreated = function(extResult, queryManager, customIdentifier)
{
	if (extResult.isValid())
	{
		var tmpQueryManager = extResult.getData();
		this.updateSacTableWithQuery(tmpQueryManager);
	}
	if (extResult.hasErrors())
	{
		this.queryLoadingError(extResult.getSummary());
	}
};
oFF.StdAidos.prototype.onClick = function(event) {};
oFF.StdAidos.prototype.onContextMenu = function(event)
{
	var clickX = event.getParameters().getIntegerByKeyExt(oFF.UiControlEvent.PARAM_CLICK_X, 0);
	var clickY = event.getParameters().getIntegerByKeyExt(oFF.UiControlEvent.PARAM_CLICK_Y, 0);
	var tmpMenu = this.getGenesis().newControl(oFF.UiType.MENU);
	var tmpMenuItem = tmpMenu.addNewItem();
	tmpMenuItem.setText("Test Cell action!");
	tmpMenu.openAtPosition(clickX, clickY);
};
oFF.StdAidos.prototype.onSelectionChange = function(event)
{
	var selectionArea = event.getParameters().getStringByKeyExt(oFF.UiControlEvent.PARAM_SELECTION_AREA, "");
	var parser = oFF.JsonParserFactory.newInstance();
	var selectionAreaJson = parser.parse(selectionArea);
	if (selectionAreaJson.isStructure())
	{
		var tmpJson = selectionAreaJson;
		var startCol = tmpJson.getIntegerByKey("startCol");
		this.getGenesis().showWarningToast(oFF.XInteger.convertToString(startCol));
	}
};
oFF.StdAidos.prototype.onButtonPress = function(event)
{
	var pressedButtonName = event.getParameters().getStringByKeyExt(oFF.UiControlEvent.PARAM_PRESSED_BUTTON_TYPE, null);
	var pressedButtonType = oFF.UiPressedButtonType.lookup(pressedButtonName);
	if (oFF.notNull(pressedButtonType) && pressedButtonType === oFF.UiPressedButtonType.DRILL)
	{
		this.getGenesis().showInfoToast("Drill icon clicked!");
	}
};

oFF.Spreadsheet = function() {};
oFF.Spreadsheet.prototype = new oFF.DfUiProgram();
oFF.Spreadsheet.prototype._ff_c = "Spreadsheet";

oFF.Spreadsheet.prototype.m_fileName = null;
oFF.Spreadsheet.prototype.newProgram = function()
{
	var newObj = new oFF.Spreadsheet();
	newObj.setup();
	return newObj;
};
oFF.Spreadsheet.prototype.doSetupProgramMetadata = function(metadata)
{
	oFF.DfUiProgram.prototype.doSetupProgramMetadata.call( this , metadata);
	metadata.addParameter(oFF.DfProgram.PARAM_FILE, "The file");
};
oFF.Spreadsheet.prototype.evalArguments = function()
{
	oFF.DfUiProgram.prototype.evalArguments.call( this );
	this.m_fileName = this.getArgumentStructure().getStringByKey(oFF.DfProgram.PARAM_FILE);
};
oFF.Spreadsheet.prototype.buildUi = function(genesis)
{
	oFF.DfUiProgram.prototype.buildUi.call( this , genesis);
	var doc = oFF.ShDocument.create();
	if (oFF.notNull(this.m_fileName))
	{
		var file = oFF.XFile.create(this.getSession(), this.m_fileName);
		var content = file.load();
		var jsonContent = content.getJsonContent().asStructure();
		var cellList = jsonContent.getListByKey("Cells");
		for (var i = 0; i < cellList.size(); i++)
		{
			var cell = cellList.getStructureAt(i);
			var x = cell.getIntegerByKey("x");
			var y = cell.getIntegerByKey("y");
			var docCell = doc.newCell(x, y);
			var theType = cell.getStringByKey("type");
			if (oFF.XString.isEqual(theType, "text"))
			{
				docCell.setText(cell.getStringByKey("text"));
			}
			else if (oFF.XString.isEqual(theType, "double"))
			{
				docCell.setDouble(cell.getDoubleByKey("dvalue"));
			}
			else if (oFF.XString.isEqual(theType, "int"))
			{
				docCell.setInteger(cell.getIntegerByKey("ivalue"));
			}
			else if (oFF.XString.isEqual(theType, "expr"))
			{
				docCell.setExpression(cell.getStringByKey("expr"));
			}
		}
	}
	else
	{
		doc.newCell(0, 0).setText("Example Grid");
		doc.newCell(0, 1).setDouble(23.71);
		doc.newCell(1, 1).setInteger(1729);
		doc.newCell(0, 2).setExpression("set('Hello world!');");
		doc.newCell(1, 2).setExpression("set(23);");
		doc.newCell(1, 3).setExpression("set(sum(A2:B3));");
	}
	doc.evaluate();
	var model = doc.toGridStructure();
	var vl = genesis.newRoot(oFF.UiType.VERTICAL_LAYOUT);
	var vizGrid = vl.addNewItemOfType(oFF.UiType.VIZ_GRID);
	vizGrid.setModelJson(model);
	vl.addNewItemOfType(oFF.UiType.BUTTON).setText("Hello");
};

oFF.ScAtlas = function() {};
oFF.ScAtlas.prototype = new oFF.DfUiProgram();
oFF.ScAtlas.prototype._ff_c = "ScAtlas";

oFF.ScAtlas.DEFAULT_PROGRAM_NAME = "Atlas";
oFF.ScAtlas.ASD_FILE_NAME_KEY = "name";
oFF.ScAtlas.ASD_FILE_SYSTEM_NAME_KEY = "systemName";
oFF.ScAtlas.ASD_FILE_SYSTEM_URL_KEY = "systemUrl";
oFF.ScAtlas.ASD_FILE_STORY_ID_KEY = "storyId";
oFF.ScAtlas.ASD_FILE_TYPE_KEY = "type";
oFF.ScAtlas.ASD_FILE_WIDGET_IDS_KEY = "widgetIds";
oFF.ScAtlas.ASD_FILE_LAYOUT_TYPE_KEY = "layoutType";
oFF.ScAtlas.ASD_FILE_CHART_TYPE_KEY = "chartType";
oFF.ScAtlas.ASD_FILE_TYPE_DASHBOARD = "dashboard";
oFF.ScAtlas.ASD_WIDGET_SEPARATOR_TOKEN = ",";
oFF.ScAtlas.createRunner = function()
{
	var runner = oFF.KernelBoot.createByName(oFF.ScAtlas.DEFAULT_PROGRAM_NAME);
	return runner;
};
oFF.ScAtlas.createNewAtlasProgram = function()
{
	var prg = new oFF.ScAtlas();
	prg.setup();
	return prg;
};
oFF.ScAtlas.prototype.m_sacUrl = null;
oFF.ScAtlas.prototype.m_layout = null;
oFF.ScAtlas.prototype.m_chartType = null;
oFF.ScAtlas.prototype.m_systemDict = null;
oFF.ScAtlas.prototype.m_mainNavigationContainer = null;
oFF.ScAtlas.prototype.m_startPage = null;
oFF.ScAtlas.prototype.m_urlInput = null;
oFF.ScAtlas.prototype.m_orcaService = null;
oFF.ScAtlas.prototype.m_file = null;
oFF.ScAtlas.prototype.m_storyFileJson = null;
oFF.ScAtlas.prototype.newProgram = function()
{
	var prg = new oFF.ScAtlas();
	prg.setup();
	return prg;
};
oFF.ScAtlas.prototype.doSetupProgramMetadata = function(metadata)
{
	oFF.DfUiProgram.prototype.doSetupProgramMetadata.call( this , metadata);
	metadata.addOption(oFF.DfProgram.PARAM_FILE, "Specify a atlas story file", "Relative URI", oFF.XValueType.STRING);
};
oFF.ScAtlas.prototype.evalArguments = function()
{
	oFF.DfUiProgram.prototype.evalArguments.call( this );
	var argStruct = this.getArgumentStructure();
	var filePathStr = argStruct.getStringByKey(oFF.DfProgram.PARAM_FILE);
	if (oFF.notNull(filePathStr))
	{
		var session = this.getSession();
		var storyFile = oFF.XFile.createExt(session, filePathStr, oFF.PathFormat.AUTO_DETECT, oFF.VarResolveMode.DOLLAR);
		if (oFF.isNull(storyFile) || storyFile.isExisting() === false)
		{
			this.log2("File does not exist: ", filePathStr);
		}
		else
		{
			this.m_file = storyFile;
		}
	}
};
oFF.ScAtlas.prototype.initializeProgram = function()
{
	oFF.DfUiProgram.prototype.initializeProgram.call( this );
	this.setupInternal();
};
oFF.ScAtlas.prototype.releaseObject = function()
{
	oFF.DfUiProgram.prototype.releaseObject.call( this );
	this.m_startPage = oFF.XObjectExt.release(this.m_startPage);
	this.m_mainNavigationContainer = oFF.XObjectExt.release(this.m_mainNavigationContainer);
	this.m_urlInput = oFF.XObjectExt.release(this.m_urlInput);
	this.m_orcaService = oFF.XObjectExt.release(this.m_orcaService);
	if (oFF.notNull(this.m_systemDict))
	{
		this.m_systemDict.clear();
		this.m_systemDict = oFF.XObjectExt.release(this.m_systemDict);
	}
	this.m_layout = null;
	this.m_chartType = null;
	this.m_file = oFF.XObjectExt.release(this.m_file);
	this.m_storyFileJson = null;
};
oFF.ScAtlas.prototype.getLogSeverity = function()
{
	return oFF.Severity.PRINT;
};
oFF.ScAtlas.prototype.isShowMenuBar = function()
{
	return true;
};
oFF.ScAtlas.prototype.getDefaultWindowSize = function()
{
	return oFF.UiSizeValue.createByCss("60vw", "60vh");
};
oFF.ScAtlas.prototype.getDefaultProgramName = function()
{
	return oFF.ScAtlas.DEFAULT_PROGRAM_NAME;
};
oFF.ScAtlas.prototype.setupInternal = function()
{
	this.m_layout = oFF.OcLayoutType.CANVAS;
	this.m_chartType = oFF.OcChartType.HIGHCHARTS;
	this.m_systemDict = oFF.XHashMapOfStringByString.create();
	this.m_systemDict.put("apollo", oFF.XStringUtils.concatenate5("http:", "//TEST_Admin:Admin123Admin123:", "basic@apollo.oe", "mapi.only.sa", "p:8000?system_type=orca"));
	this.m_systemDict.put("monsun", oFF.XStringUtils.concatenate5("http:", "//TEST_firefly:Welcome1:", "basic@bw.ac", "ioem.c.eu-de-1.cloud.s", "ap:8001?system_type=orca"));
};
oFF.ScAtlas.prototype.buildUi = function(genesis)
{
	oFF.DfUiProgram.prototype.buildUi.call( this , genesis);
	this.addMenuBarButton("scAtlasToolbarStoryBtn", null, "Story", null, this).setEnabled(false);
	this.addMenuBarButton("scAtlasToolbarLogoutBtn", null, "Logout", "log", this).setEnabled(false);
	this.m_mainNavigationContainer = genesis.newControl(oFF.UiType.NAVIGATION_CONTAINER);
	this.m_mainNavigationContainer.useMaxSpace();
	this.m_mainNavigationContainer.registerOnBack(this);
	if (oFF.notNull(this.m_file))
	{
		this.openStoryFromFile(this.m_file);
	}
	else
	{
		this.createStartPage();
		this.m_urlInput.setText(this.m_systemDict.getByKey("apollo"));
		this.setOrcaUrl(this.m_systemDict.getByKey("apollo"));
	}
	genesis.setRoot(this.m_mainNavigationContainer);
};
oFF.ScAtlas.prototype.createStartPage = function()
{
	if (oFF.isNull(this.m_startPage) && oFF.notNull(this.m_mainNavigationContainer))
	{
		this.m_startPage = this.m_mainNavigationContainer.pushNewPage();
		this.m_startPage.setName("scAtlasMainContainer");
		this.m_startPage.setText("SAC Story Connector");
		this.m_startPage.setShowHeader(false);
		var startTabBar = this.m_startPage.setNewContent(oFF.UiType.TAB_STRIP);
		startTabBar.useMaxSpace();
		startTabBar.setName("scAtlasStartPageTabBar");
		var tabBarItemHome = startTabBar.addNewItem();
		tabBarItemHome.setName("scAtlasHomeTab");
		tabBarItemHome.setText("Home");
		tabBarItemHome.setIcon("home");
		this.createHomeTab(tabBarItemHome);
		var tabBarItemSettings = startTabBar.addNewItem();
		tabBarItemSettings.setName("scAtlasSettingsTab");
		tabBarItemSettings.setText("Settings");
		tabBarItemSettings.setIcon("settings");
		this.createSettingsTab(tabBarItemSettings);
	}
};
oFF.ScAtlas.prototype.createHomeTab = function(tabBar)
{
	var homeFloatingLayoutVert = tabBar.setNewContent(oFF.UiType.FLEX_LAYOUT);
	homeFloatingLayoutVert.useMaxSpace();
	homeFloatingLayoutVert.setDirection(oFF.UiFlexDirection.COLUMN);
	homeFloatingLayoutVert.setAlignItems(oFF.UiFlexAlignItems.CENTER);
	homeFloatingLayoutVert.addNewItemOfType(oFF.UiType.SPACER).setWidthCss("100%");
	homeFloatingLayoutVert.addNewItemOfType(oFF.UiType.SPACER).setHeightCss("10px");
	homeFloatingLayoutVert.addNewItemOfType(oFF.UiType.LABEL).setText("Select server");
	var hostDropdown = homeFloatingLayoutVert.addNewItemOfType(oFF.UiType.DROPDOWN);
	hostDropdown.setName("hostDropdown");
	hostDropdown.setWidthExt(350, oFF.UiSizeUnit.PIXEL);
	hostDropdown.setHeightExt(200, oFF.UiSizeUnit.PIXEL);
	hostDropdown.registerOnSelect(this);
	var customDdItem = hostDropdown.addNewItem();
	customDdItem.setName("custom");
	customDdItem.setText("Custom");
	var systemNameIterator = this.m_systemDict.getKeysAsIteratorOfString();
	while (systemNameIterator.hasNext())
	{
		var tmpSysName = systemNameIterator.next();
		var tmpDdItem = hostDropdown.addNewItem();
		tmpDdItem.setName(tmpSysName);
		tmpDdItem.setText(tmpSysName);
	}
	hostDropdown.setSelectedName("apollo");
	homeFloatingLayoutVert.addNewItemOfType(oFF.UiType.LABEL).setText("Orca URL");
	this.m_urlInput = homeFloatingLayoutVert.addNewItemOfType(oFF.UiType.INPUT);
	this.m_urlInput.setName("scAtlasUrlInput");
	this.m_urlInput.setPlaceholder("URL");
	this.m_urlInput.setText(this.m_sacUrl);
	this.m_urlInput.setWidthExt(350, oFF.UiSizeUnit.PIXEL);
	this.m_urlInput.registerOnLiveChange(this);
	this.m_urlInput.registerOnEnter(this);
	var loginBtn = homeFloatingLayoutVert.addNewItemOfType(oFF.UiType.BUTTON);
	loginBtn.setName("scAtlasLoginBtn");
	loginBtn.setText("Login");
	loginBtn.setIcon("visits");
	loginBtn.registerOnPress(this);
};
oFF.ScAtlas.prototype.createSettingsTab = function(tabBar)
{
	var settingsFloatingLayoutVert = tabBar.setNewContent(oFF.UiType.FLEX_LAYOUT);
	settingsFloatingLayoutVert.useMaxSpace();
	settingsFloatingLayoutVert.setDirection(oFF.UiFlexDirection.COLUMN);
	settingsFloatingLayoutVert.setAlignItems(oFF.UiFlexAlignItems.CENTER);
	settingsFloatingLayoutVert.addNewItemOfType(oFF.UiType.SPACER).setWidthCss("100%");
	settingsFloatingLayoutVert.addNewItemOfType(oFF.UiType.SPACER).setHeightCss("10px");
	var clearCacheBtn = settingsFloatingLayoutVert.addNewItemOfType(oFF.UiType.BUTTON);
	clearCacheBtn.setName("scAtlasClearCacheBtn");
	clearCacheBtn.setText("Clear Cache");
	clearCacheBtn.setIcon("delete");
	clearCacheBtn.setButtonType(oFF.UiButtonType.DESTRUCTIVE);
	clearCacheBtn.registerOnPress(this);
	var spacerCaccheBtn = settingsFloatingLayoutVert.addNewItemOfType(oFF.UiType.SPACER);
	spacerCaccheBtn.setName("spacerCaccheBtn");
	spacerCaccheBtn.setHeightValue(20);
	spacerCaccheBtn.setHeightUnit(oFF.UiSizeUnit.PIXEL);
	settingsFloatingLayoutVert.addNewItemOfType(oFF.UiType.LABEL).setText("Select layout");
	var layoutDropdown = settingsFloatingLayoutVert.addNewItemOfType(oFF.UiType.DROPDOWN);
	layoutDropdown.setName("scAtlasLayoutDropdown");
	layoutDropdown.setWidthExt(350, oFF.UiSizeUnit.PIXEL);
	layoutDropdown.setHeightExt(125, oFF.UiSizeUnit.PIXEL);
	layoutDropdown.registerOnSelect(this);
	layoutDropdown.addNewItem().setText("Canvas").setName(oFF.OcLayoutType.CANVAS.getName());
	layoutDropdown.addNewItem().setText("Flow").setName(oFF.OcLayoutType.FLOW.getName());
	layoutDropdown.addNewItem().setText("Flow simple (only charts and data grids)").setName(oFF.OcLayoutType.FLOW_SIMPLE.getName());
	layoutDropdown.setSelectedName(this.m_layout.getName());
	var spacerLayoutDd = settingsFloatingLayoutVert.addNewItemOfType(oFF.UiType.SPACER);
	spacerLayoutDd.setName("spacerLayoutDd");
	spacerLayoutDd.setHeightValue(20);
	spacerLayoutDd.setHeightUnit(oFF.UiSizeUnit.PIXEL);
	settingsFloatingLayoutVert.addNewItemOfType(oFF.UiType.LABEL).setText("Select chart type");
	var chartDropdown = settingsFloatingLayoutVert.addNewItemOfType(oFF.UiType.DROPDOWN);
	chartDropdown.setName("scAtlasChartDropdown");
	chartDropdown.setWidthExt(350, oFF.UiSizeUnit.PIXEL);
	chartDropdown.setHeightExt(125, oFF.UiSizeUnit.PIXEL);
	chartDropdown.registerOnSelect(this);
	chartDropdown.addNewItem().setText("Highcharts").setName(oFF.OcChartType.HIGHCHARTS.getName());
	chartDropdown.addNewItem().setText("MicroChart").setName(oFF.OcChartType.MICRO_CHART.getName());
	chartDropdown.setSelectedName(this.m_chartType.getName());
};
oFF.ScAtlas.prototype.setOrcaUrl = function(orcaUrl)
{
	this.m_sacUrl = orcaUrl;
	var sysUri = oFF.XUri.createFromUrl(orcaUrl);
	var systemLandscape = this.getApplication().getSystemLandscape();
	systemLandscape.setSystemByUri(oFF.OcOrcaServiceConfig.ORCA_MASTER_SYSTEM_NAME, sysUri, null);
};
oFF.ScAtlas.prototype.loginToSac = function(setBusy)
{
	if (setBusy)
	{
		this.m_mainNavigationContainer.setBusy(true);
	}
	var config = oFF.OcOrcaServiceConfig.create(this.getApplication(), oFF.OcOrcaServiceConfig.ORCA_MASTER_SYSTEM_NAME);
	config.processOrcaServiceCreation(oFF.SyncType.NON_BLOCKING, this, null);
};
oFF.ScAtlas.prototype.goToStoryListPage = function(storyCatalog)
{
	var storyListView = oFF.ScAtlasStoryListView.createStoryListView(this.getGenesis(), storyCatalog, this);
	if (oFF.notNull(storyListView))
	{
		this.m_mainNavigationContainer.pushPage(storyListView.getPage());
	}
};
oFF.ScAtlas.prototype.renderStory = function(story)
{
	if (oFF.notNull(this.m_storyFileJson))
	{
		this.renderFromFile(story);
	}
	else
	{
		var storyView = oFF.ScAtlasStoryView.createStoryView(this.getGenesis(), this.getApplication(), story, this.m_layout, this.m_chartType);
		this.m_mainNavigationContainer.pushPage(storyView.getPage());
	}
};
oFF.ScAtlas.prototype.openStoryFromFile = function(storyFile)
{
	if (storyFile.isExisting())
	{
		var storyFilePage = this.m_mainNavigationContainer.pushNewPage();
		storyFilePage.setName("scAtlasStoryFilePage");
		storyFilePage.setText("Story");
		storyFilePage.setBackgroundColor(oFF.UiColor.WHITE);
		storyFilePage.setShowHeader(false);
		var activityIndicator = storyFilePage.setNewContent(oFF.UiType.ACTIVITY_INDICATOR);
		activityIndicator.setText("Loading story...");
		activityIndicator.useMaxSpace();
		storyFile.processLoad(oFF.SyncType.NON_BLOCKING, this, null, oFF.CompressionType.NONE);
	}
};
oFF.ScAtlas.prototype.loadStoryFromFileJson = function(storyJson)
{
	if (this.isStoryJsonFileValid(storyJson))
	{
		this.m_storyFileJson = storyJson;
		this.setOrcaUrl(this.m_storyFileJson.getStringByKey("systemUrl"));
		this.loginToSac(false);
	}
	else
	{
		this.getGenesis().showErrorToast("Invalid story file!");
		this.m_storyFileJson = null;
	}
};
oFF.ScAtlas.prototype.isStoryJsonFileValid = function(storyJson)
{
	if (oFF.isNull(storyJson))
	{
		return false;
	}
	if (!storyJson.containsKey(oFF.ScAtlas.ASD_FILE_SYSTEM_NAME_KEY))
	{
		return false;
	}
	if (!storyJson.containsKey(oFF.ScAtlas.ASD_FILE_SYSTEM_URL_KEY))
	{
		return false;
	}
	if (!storyJson.containsKey(oFF.ScAtlas.ASD_FILE_STORY_ID_KEY))
	{
		return false;
	}
	return true;
};
oFF.ScAtlas.prototype.renderFromFile = function(story)
{
	this.m_mainNavigationContainer.clearPages();
	this.setTitle(this.m_file.getName());
	var name = this.m_storyFileJson.getStringByKeyExt(oFF.ScAtlas.ASD_FILE_NAME_KEY, null);
	var tmpLayout = oFF.OcLayoutType.getByName(this.m_storyFileJson.getStringByKey(oFF.ScAtlas.ASD_FILE_LAYOUT_TYPE_KEY));
	if (oFF.isNull(tmpLayout))
	{
		tmpLayout = this.m_layout;
	}
	var tmpChart = oFF.OcChartType.lookup(this.m_storyFileJson.getStringByKey(oFF.ScAtlas.ASD_FILE_CHART_TYPE_KEY));
	if (oFF.isNull(tmpChart))
	{
		tmpChart = this.m_chartType;
	}
	var type = this.m_storyFileJson.getStringByKeyExt(oFF.ScAtlas.ASD_FILE_TYPE_KEY, null);
	if (oFF.XString.isEqual(type, oFF.ScAtlas.ASD_FILE_TYPE_DASHBOARD))
	{
		var widgetIds = this.m_storyFileJson.getStringByKeyExt(oFF.ScAtlas.ASD_FILE_WIDGET_IDS_KEY, null);
		var widgetIdsList = oFF.XStringTokenizer.splitString(widgetIds, oFF.ScAtlas.ASD_WIDGET_SEPARATOR_TOKEN);
		var dashboardView = oFF.ScAtlasDashboardView.createDashboardView(this.getGenesis(), this.getApplication(), story, widgetIdsList, name);
		this.m_mainNavigationContainer.pushPage(dashboardView.getPage());
	}
	else
	{
		var storyView = oFF.ScAtlasStoryView.createStoryView(this.getGenesis(), this.getApplication(), story, tmpLayout, tmpChart);
		this.m_mainNavigationContainer.pushPage(storyView.getPage());
	}
};
oFF.ScAtlas.prototype.createStoryToolbarMenu = function(fileBtn)
{
	var storyToolbarMenu = this.m_genesis.newControl(oFF.UiType.MENU);
	storyToolbarMenu.setName("storyToolbarMenu");
	storyToolbarMenu.addNewItem().setName("atlasStoryToolbarMenuSave").setText("Save").setIcon("save").registerOnPress(this);
	storyToolbarMenu.openAt(fileBtn);
};
oFF.ScAtlas.prototype.onOrcaServiceCreated = function(extResult, orcaService, customIdentifier)
{
	if (extResult.isValid())
	{
		this.log("#1 success logon");
		this.m_orcaService = orcaService;
		orcaService.processSystemLandscapeLoad(oFF.SyncType.NON_BLOCKING, this, null);
	}
	else
	{
		this.log("#1 failure logon");
		this.log(extResult.getSummary());
		this.getGenesis().showErrorToast("Logon failed!");
	}
};
oFF.ScAtlas.prototype.onSystemsLoaded = function(extResult, systems, customIdentifier)
{
	if (extResult.isValid())
	{
		this.log("#2 success system loaded");
		var systemLandscape = this.getApplication().getSystemLandscape();
		for (var i = 0; i < systems.size(); i++)
		{
			var systemDescription = systems.get(i);
			systemLandscape.setSystemByDescription(systemDescription);
		}
		if (oFF.notNull(this.m_storyFileJson))
		{
			this.m_orcaService.processStoryLoad(oFF.SyncType.NON_BLOCKING, this, null, this.m_storyFileJson.getStringByKey(oFF.ScAtlas.ASD_FILE_STORY_ID_KEY));
		}
		else
		{
			this.m_orcaService.processStoryCatalogLoad(oFF.SyncType.NON_BLOCKING, this, null, null);
		}
	}
	else
	{
		this.log("#2 failure system loaded");
		this.log(extResult.getSummary());
		this.getGenesis().showErrorToast("System load failed!");
	}
};
oFF.ScAtlas.prototype.onStoryCatalogLoaded = function(extResult, storyCatalog, customIdentifier)
{
	this.m_mainNavigationContainer.setBusy(false);
	if (extResult.isValid())
	{
		this.log("#3 success story catalog loaded");
		this.goToStoryListPage(extResult.getData());
	}
	else
	{
		this.log("#3 failure story catalog loaded");
		this.log(extResult.getSummary());
		this.getGenesis().showErrorToast("System catalog load failed!");
	}
};
oFF.ScAtlas.prototype.onStoryLoaded = function(extResult, story, customIdentifier)
{
	this.m_mainNavigationContainer.setBusy(false);
	if (extResult.isValid())
	{
		this.log("#4 success story loaded");
		this.renderStory(story);
	}
	else
	{
		this.log("#4 failure story loaded");
		this.log(extResult.getSummary());
		this.getGenesis().showErrorToast("Story load failed!");
	}
};
oFF.ScAtlas.prototype.onFileLoaded = function(extResult, file, fileContent, customIdentifier)
{
	this.log("File loaded!");
	if (extResult.isValid())
	{
		if (oFF.notNull(fileContent))
		{
			var jsonContent = fileContent.getJsonContent();
			if (oFF.notNull(jsonContent))
			{
				this.loadStoryFromFileJson(jsonContent.asStructure());
			}
			else
			{
				this.getGenesis().showErrorToast("Not a json document!");
			}
		}
		else
		{
			this.getGenesis().showErrorToast("Something went wrong! File content is empty!");
		}
	}
	else
	{
		this.getGenesis().showErrorToast("Error while fetching the specified file!");
	}
};
oFF.ScAtlas.prototype.onStoryCatalogItemSelected = function(storyCatalogItem)
{
	if (oFF.notNull(storyCatalogItem))
	{
		this.m_mainNavigationContainer.setBusy(true);
		this.m_orcaService.processStoryLoad(oFF.SyncType.NON_BLOCKING, this, null, storyCatalogItem.getId());
		this.log(storyCatalogItem.getId());
	}
};
oFF.ScAtlas.prototype.onPress = function(event)
{
	oFF.DfUiProgram.prototype.onPress.call( this , event);
	var control = event.getControl();
	var controlParent = control.getParent();
	if (oFF.XString.isEqual(control.getName(), "scAtlasLoginBtn"))
	{
		this.setOrcaUrl(this.m_urlInput.getText());
		this.loginToSac(true);
		return;
	}
	if (oFF.notNull(controlParent) && controlParent.getUiType() === oFF.UiType.TOOLBAR)
	{
		switch (control.getName())
		{
			case "scAtlasToolbarStoryBtn":
				this.createStoryToolbarMenu(control);
				break;

			case "scAtlasToolbarLogoutBtn":
				this.getGenesis().showInfoToast("It works! Fake logout!");
				break;

			default:
		}
	}
	if (oFF.notNull(controlParent) && controlParent.getUiType() === oFF.UiType.MENU)
	{
		if (oFF.XString.isEqual(controlParent.getName(), "editToolbarMenu"))
		{
			switch (control.getName())
			{
				case "editToolbarMenuAddBtn":
					break;

				case "editToolbarMenuImportBtn":
					break;

				case "editToolbarMenuClearUserSystemsBtn":
					break;

				default:
			}
		}
		else if (oFF.XString.isEqual(controlParent.getName(), "toolsToolbarMenu"))
		{
			switch (control.getName())
			{
				case "toolsToolbarMenuConnectBtn":
					break;

				default:
			}
		}
	}
};
oFF.ScAtlas.prototype.onSelect = function(event)
{
	if (event.getControl().getUiType() === oFF.UiType.DROPDOWN)
	{
		var selectedItem = event.getSelectedItem();
		if (oFF.XString.isEqual(event.getControl().getName(), "hostDropdown"))
		{
			var tmpSysName = selectedItem.getName();
			if (this.m_systemDict.containsKey(tmpSysName))
			{
				this.m_urlInput.setText(this.m_systemDict.getByKey(tmpSysName));
				this.setOrcaUrl(this.m_systemDict.getByKey(tmpSysName));
			}
			else
			{
				this.m_urlInput.setText("");
				this.setOrcaUrl("");
			}
		}
		else if (oFF.XString.isEqual(event.getControl().getName(), "scAtlasChartDropdown"))
		{
			var chartTypeName = selectedItem.getName();
			this.m_chartType = oFF.OcChartType.lookup(chartTypeName);
		}
	}
};
oFF.ScAtlas.prototype.onLiveChange = function(event) {};
oFF.ScAtlas.prototype.onEnter = function(event) {};
oFF.ScAtlas.prototype.onBack = function(event) {};

oFF.FirstAidTestProgram = function() {};
oFF.FirstAidTestProgram.prototype = new oFF.DfUiProgram();
oFF.FirstAidTestProgram.prototype._ff_c = "FirstAidTestProgram";

oFF.FirstAidTestProgram.DEFAULT_PROGRAM_NAME = "FirstAidTest";
oFF.FirstAidTestProgram.prototype.m_createQmBtn = null;
oFF.FirstAidTestProgram.prototype.m_cloneQmBtn = null;
oFF.FirstAidTestProgram.prototype.m_overviewBtn = null;
oFF.FirstAidTestProgram.prototype.m_shellBtn = null;
oFF.FirstAidTestProgram.prototype.m_overview = null;
oFF.FirstAidTestProgram.prototype.newProgram = function()
{
	var program = new oFF.FirstAidTestProgram();
	program.setup();
	return program;
};
oFF.FirstAidTestProgram.prototype.buildUi = function(genesis)
{
	oFF.DfUiProgram.prototype.buildUi.call( this , genesis);
	var root = genesis.newRoot(oFF.UiType.VERTICAL_LAYOUT);
	this.m_createQmBtn = root.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_createQmBtn.setText("Create QM...");
	this.m_createQmBtn.registerOnPress(this);
	this.m_cloneQmBtn = root.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_cloneQmBtn.setText("Clone last QM");
	this.m_cloneQmBtn.setEnabled(false);
	this.m_cloneQmBtn.registerOnPress(this);
	this.m_overviewBtn = root.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_overviewBtn.setText("FirstAid Dialog");
	this.m_overviewBtn.registerOnPress(this);
	this.m_shellBtn = root.addNewItemOfType(oFF.UiType.BUTTON);
	this.m_shellBtn.setText("FirstAid Shell");
	this.m_shellBtn.registerOnPress(this);
	var dataSource = oFF.QFactory.createDataSource();
	dataSource.setSystemName("KIW");
	dataSource.setFullQualifiedName("query:[0BOC_TEST_VARIABLE_TYPES_1]");
	this.onDatasourceSelected(dataSource);
};
oFF.FirstAidTestProgram.prototype.onPress = function(event)
{
	oFF.DfUiProgram.prototype.onPress.call( this , event);
	var control = event.getControl();
	if (control === this.m_overviewBtn)
	{
		oFF.XObjectExt.release(this.m_overview);
		this.m_overview = oFF.FirstAidDialog.createFirstAidDialog(this.getApplication(), this.getUiManager());
		this.m_overview.open();
	}
	else if (control === this.m_shellBtn)
	{
		var process = this.getApplication().getProcess();
		if (oFF.notNull(process))
		{
			var newArgs = oFF.ProgramArgs.create();
			var startCfgBase = oFF.ProgramStartCfg.create(process, "shell", null, newArgs);
			startCfgBase.setIsNewConsoleNeeded(true);
			startCfgBase.setIsCreatingChildProcess(false);
			startCfgBase.processExecution(oFF.SyncType.NON_BLOCKING, null, null);
		}
	}
	else if (control === this.m_createQmBtn)
	{
		this.createQm();
	}
	else if (control === this.m_cloneQmBtn)
	{
		var olapEnv = this.getApplication().getOlapEnvironment();
		var allQms = olapEnv.getAllAreaQueryManager();
		var lastQm = allQms.get(allQms.size() - 1);
		lastQm.cloneQueryManager();
	}
};
oFF.FirstAidTestProgram.prototype.createQm = function()
{
	var appStoreDlgManifest = oFF.ProgramRegistration.getProgramManifest(oFF.AuDatasourcePicker.DEFAULT_PROGRAM_NAME);
	var appStoreDlgStartCfg = oFF.ProgramStartCfg.create(this.getProcess(), appStoreDlgManifest.getName(), null, null);
	var tmpArgs = appStoreDlgStartCfg.getArguments();
	tmpArgs.putXObject(oFF.AuDatasourcePicker.PARAM_LISTENER, this);
	appStoreDlgStartCfg.setParentProcess(this.getProcess());
	appStoreDlgStartCfg.setIsCreatingChildProcess(true);
	appStoreDlgStartCfg.processExecution(oFF.SyncType.NON_BLOCKING, null, null);
};
oFF.FirstAidTestProgram.prototype.onDatasourceSelected = function(dataSource)
{
	if (oFF.isNull(dataSource))
	{
		return;
	}
	var serviceConfig = oFF.QueryServiceConfig.createWithDataSource(this.getApplication(), dataSource.getSystemName(), dataSource);
	var result = serviceConfig.processQueryManagerCreation(oFF.SyncType.BLOCKING, null, null);
	if (result.hasErrors())
	{
		this.logError(result.getSummary());
	}
	else
	{
		result.getData().getTagging().put("myTag", "hoi");
		result.getData().getTagging().put("myTag1", "hoi");
		result.getData().getTagging().put("myTag2", "hoi");
		result.getData().getTagging().put("myTag3", "hoi");
		result.getData().getTagging().put("myTag4", "hoi");
		this.m_cloneQmBtn.setEnabled(true);
	}
};

oFF.ApplicationUiModule = function() {};
oFF.ApplicationUiModule.prototype = new oFF.DfModule();
oFF.ApplicationUiModule.prototype._ff_c = "ApplicationUiModule";

oFF.ApplicationUiModule.s_module = null;
oFF.ApplicationUiModule.getInstance = function()
{
	if (oFF.isNull(oFF.ApplicationUiModule.s_module))
	{
		oFF.DfModule.checkInitialized(oFF.SystemUiModule.getInstance());
		oFF.DfModule.checkInitialized(oFF.OlapApiModule.getInstance());
		oFF.DfModule.checkInitialized(oFF.StoryModule.getInstance());
		oFF.DfModule.checkInitialized(oFF.QuasarModule.getInstance());
		oFF.DfModule.checkInitialized(oFF.OlapUiModule.getInstance());
		oFF.ApplicationUiModule.s_module = oFF.DfModule.startExt(new oFF.ApplicationUiModule());
		oFF.ProgramRegistration.setProgramFactory(oFF.AnalyticCardsProgram.DEFAULT_PROGRAM_NAME, new oFF.AnalyticCardsProgram());
		oFF.ProgramRegistration.setProgramFactory(oFF.Gyros.DEFAULT_PROGRAM_NAME, new oFF.Gyros());
		oFF.ProgramRegistration.setProgramFactory(oFF.FirstAidTestProgram.DEFAULT_PROGRAM_NAME, new oFF.FirstAidTestProgram());
		oFF.ProgramRegistration.setProgramFactory(oFF.FilterDialogProgram.DEFAULT_PROGRAM_NAME, new oFF.FilterDialogProgram());
		oFF.ProgramRegistration.setProgramFactory(oFF.DimensionDialogTestProgram.DEFAULT_PROGRAM_NAME, new oFF.DimensionDialogTestProgram());
		oFF.ProgramRegistration.setProgramFactory(oFF.CatalogDialogDummyProgram.DEFAULT_PROGRAM_NAME, new oFF.CatalogDialogDummyProgram());
		oFF.ProgramRegistration.setProgramFactory(oFF.QvKratos.DEFAULT_PROGRAM_NAME, new oFF.QvKratos());
		oFF.ProgramRegistration.setProgramFactory(oFF.StdAidos.DEFAULT_PROGRAM_NAME, new oFF.StdAidos());
		oFF.ProgramRegistration.setProgramFactory(oFF.GsGalaxyStudio.DEFAULT_PROGRAM_NAME, new oFF.GsGalaxyStudio());
		oFF.ProgramRegistration.setProgramFactory(oFF.ScAtlas.DEFAULT_PROGRAM_NAME, new oFF.ScAtlas());
		oFF.ProgramRegistration.setProgramFactory(oFF.AuProteusShell.DEFAULT_PROGRAM_NAME, new oFF.AuProteusShell());
		oFF.ProgramRegistration.setProgramFactory(oFF.AuGds.DEFAULT_PROGRAM_NAME, new oFF.AuGds());
		oFF.GyrosCommand.staticSetupGyrosCommands();
		oFF.OpenQueryDialogI18n.staticSetupOqd();
		oFF.DfModule.stopExt(oFF.ApplicationUiModule.s_module);
	}
	return oFF.ApplicationUiModule.s_module;
};
oFF.ApplicationUiModule.prototype.getName = function()
{
	return "ff8050.application.ui";
};

oFF.ApplicationUiModule.getInstance();

return sap.firefly;
	} );