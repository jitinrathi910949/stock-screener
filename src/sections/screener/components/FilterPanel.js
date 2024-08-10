import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Stack, Switch, Paper, Button, Box, IconButton, Menu, MenuItem, Divider } from '@mui/material';
import { sortableHandle } from 'react-sortable-hoc';
import closeFill from '@iconify/icons-eva/close-fill';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useDispatch, useSelector } from 'react-redux';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import { Icon } from '@iconify/react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MIconButton } from 'components/@material-extend';
import { checkifAdd, validate } from '../utils/dataIndiceUtil';
import DataIndice from './data-indice';
import OperatorSelect from './OperatorSelect';
import { screenerAction } from 'redux/screener/screenerSlice';
import { MHidden } from 'components/@material-extend';
import { operatorListTypeConst } from '../utils/constants';
import IndustrialDataIndice from './indus-data-indice';

const DragHandle = sortableHandle(({ disabled }) => (
  <Box
    component="div"
    sx={{
      height: '100%',
      minHeight: '48px',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '3px',
      cursor: !disabled ? 'pointer' : 'not-allowed',
      '&:hover': !disabled && {
        borderLeft: `6px solid #0066CC `,
        transition: '.2s ease-in-out',
        zIndex: 2,
      },
    }}
  >
    <DragIndicatorIcon
      sx={[
        {
          '&:hover': !disabled && {
            color: 'secondary.main',
            zIndex: 2,
          },
          color: '#828282',
        },
      ]}
    />
  </Box>
));

FilterPanel.propTypes = {
  itemIndex: PropTypes.number,
  valueUploaded: PropTypes.array,
  bgColor: PropTypes.string,
  relation: PropTypes.string,
  type: PropTypes.string,
  isActive: PropTypes.bool,
};

const defaultFilterParams = {
  relation: 'AND',
  type: 'filter',
  isActive: true,
};

export default function FilterPanel(props) {
  const { itemIndex, valueUploaded, bgColor, relation, isActive } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);

  const { filterPanelList } = useSelector(({ screenerReducer }) => screenerReducer);

  useEffect(() => {
    const UpdatedPanelList = _.cloneDeep(filterPanelList);
    if (!_.isEmpty(UpdatedPanelList)) {
      if (filterPanelList[0].type === 'group') {
        UpdatedPanelList.shift();
        return dispatch(screenerAction.setFilterPanelList(UpdatedPanelList));
      }
      const length = UpdatedPanelList.length - 1;
      if (filterPanelList[length].type === 'group') {
        UpdatedPanelList.pop();
        return dispatch(screenerAction.setFilterPanelList(UpdatedPanelList));
      }
    }
  }, [filterPanelList]);

  const dispatch = useDispatch();

  const onAddFill = () => {
    // const updatedFields = [...selectFields];
    const valToUpdate = {};
    if (valueUploaded[valueUploaded.length - 1]?.type === 'data') {
      valToUpdate.type = 'operator';
    } else {
      valToUpdate.type = 'data';
    }
    handleValue(valToUpdate, valueUploaded.length, true);
  };
  const handleValue = (val, index, isAdd) => {
    let updatedVal = _.cloneDeep(valueUploaded);
    const updatedPanel = _.cloneDeep(filterPanelList);

    if (updatedVal.length < index) {
      updatedVal.push(val);
    } else {
      updatedVal[index] = val;
    }

    if (isAdd) {
      updatedVal = _.map(updatedVal, (upd, ind) => {
        if (ind < index) {
          upd.isComplete = true;
        }
        return upd;
      });
    }

    if (index % 2 && val.groupedAs && !validate(updatedVal, showMsg)) {
      if (index === updatedVal.length - 1) {
        updatedVal.splice(index, 1);
        updatedPanel[itemIndex].data = updatedVal;
        updatedPanel[itemIndex].bgColor = bgColor;
        dispatch(screenerAction.setFilterPanelList(updatedPanel));
        return;
      }
      return;
    }
    // setValues(updatedVal);
    updatedPanel[itemIndex] = { ...updatedPanel[itemIndex], ...defaultFilterParams };
    if (val.isComplete && checkifAdd(updatedVal, index)) {
      updatedVal.push({ type: val.type === 'data' ? 'operator' : 'data' });
    }
    updatedPanel[itemIndex].data = updatedVal;
    updatedPanel[itemIndex].bgColor = bgColor;
    dispatch(screenerAction.setFilterPanelList(updatedPanel));
  };

  const handleBlur = (value, index) => {
    console.log(value);
    if (_.isEmpty(value)) {
      const updatedVal = [...valueUploaded];
      updatedVal.splice(index, 1);
      const updatedPanel = _.cloneDeep(filterPanelList);
      updatedPanel[itemIndex].data = updatedVal;
      dispatch(screenerAction.setFilterPanelList(updatedPanel));
    }
  };

  const handleBtDelete = () => {
    const updatedPanel = _.cloneDeep(filterPanelList);

    updatedPanel.splice(itemIndex, 1);

    dispatch(screenerAction.setFilterPanelList(updatedPanel));
  };

  const handleBtNew = () => {
    const updatedPanel = _.cloneDeep(filterPanelList);

    updatedPanel[itemIndex].data = valueUploaded;

    updatedPanel.splice(itemIndex + 1, 0, { data: [], bgColor, ...defaultFilterParams });
    dispatch(screenerAction.setFilterPanelList(updatedPanel));
  };

  const handleBtCopy = () => {
    const updatedPanel = _.cloneDeep(filterPanelList);
    updatedPanel.splice(itemIndex + 1, 0, {
      data: valueUploaded,
      bgColor,
      ...defaultFilterParams,
    });
    dispatch(screenerAction.setFilterPanelList(updatedPanel));
  };

  const onBtRelation = () => {
    const updatedPanel = _.cloneDeep(filterPanelList);
    updatedPanel[itemIndex].relation = updatedPanel[itemIndex].relation === 'OR' ? 'AND' : 'OR';
    dispatch(screenerAction.setFilterPanelList(updatedPanel));
  };

  const onTgActive = (event) => {
    const { checked } = event.target;
    const updatedPanel = _.cloneDeep(filterPanelList);
    updatedPanel[itemIndex].isActive = checked;
    dispatch(screenerAction.setFilterPanelList(updatedPanel));
  };

  const showMsg = (msg, variant) => {
    enqueueSnackbar(msg, {
      variant,
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      ),
    });
  };

  const getOperatorList = (ind) => {
    let listType = operatorListTypeConst.NORMAL;
    const prevDataInd = valueUploaded[ind - 1]?.indice;
    switch (prevDataInd?.action) {
      case 'SYM_SEC_INDUS':
        listType = operatorListTypeConst.SYM_SEC_INDUS;
        break;
      default:
        break;
    }
    return listType;
  };

  const getParentIndiceComponent = (value, index) => {
    if (index > 0) {
      const prevOperatorAction = valueUploaded[index - 1]?.action;
      const prevDataIndice = valueUploaded[index - 2]?.indice?.templateValue;

      switch (prevOperatorAction) {
        case 'SYM_SEC_INDUS':
          return (
            <IndustrialDataIndice
              showInput={!value?.isComplete}
              handleValue={handleValue}
              index={index}
              value={value}
              isDisabled={!isActive}
              handleBlur={handleBlur}
              indiceSelected={prevDataIndice}
            />
          );
        default:
          return (
            <DataIndice
              showInput={!value?.isComplete}
              handleValue={handleValue}
              index={index}
              value={value}
              isDisabled={!isActive}
              handleBlur={handleBlur}
            />
          );
      }
    } else {
      return (
        <DataIndice
          showInput={!value?.isComplete}
          handleValue={handleValue}
          index={index}
          value={value}
          isDisabled={!isActive}
          handleBlur={handleBlur}
        />
      );
    }
  };

  const isShowAddIcon = () => {
    let show = true;
    const len = valueUploaded?.length || 0;
    if (valueUploaded?.length >= 7) {
      show = false;
    }

    if (valueUploaded[len - 1]?.type === 'data' && valueUploaded[len - 1]?.indice?.action === 'SYM_SEC_VALUE') show = false;

    return show;
  };

  return (
    // <Grid sx={{ flexGrow: 1, flex: 1, marginTop: '2px' }} container spacing={2}>
    // <Grid item xs={12} lg={12}>
    <>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          marginLeft: 2,
          marginRight: 2,
          minHeight: 48,
          flexWrap: { xs: 'wrap', sm: 'wrap', md: 'nowrap' },
          backgroundColor: bgColor || '#F2F4F9',
          borderRadius: 0.5,
          alignItems: 'center',
        }}
      >
        <DragHandle disabled={!isActive} />
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            flexDirection: ' center',
            maxWidth: '60vw',
            flexWrap: { xs: 'wrap', sm: 'wrap', md: 'nowrap' },
            overflow: { md: 'scroll' },
            padding: { sm: '10px 0 10px 0', xs: '10px 0 10px 0' },
            MsOverflowStyle: 'none' /* Internet Explorer 10+ */,
            scrollbarWidth: 'none' /* Firefox */,

            '::-webkit-scrollbar': {
              display: 'none' /* Safari and Chrome */,
            },
          }}
        >
          {valueUploaded.map((value, index) =>
            value?.type === 'operator' ? (
              <OperatorSelect
                showInput={!value?.isComplete}
                handleValue={handleValue}
                index={index}
                operatorListType={getOperatorList(index)}
                value={value}
                isDisabled={!isActive}
                handleBlur={handleBlur}
              />
            ) : (
              getParentIndiceComponent(value, index)
            )
          )}
          {/* {selectFields.map((fill, index) => fill.component({ index, handleValue, value: valueUploaded[index] }))} */}
          {isShowAddIcon() && (
            <IconButton disabled={!isActive} size="small" color="secondary" disableFocusRipple disableRipple>
              <AddOutlinedIcon
                sx={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: !isActive ? '#919EAB' : '#0066CC',
                  borderRadius: '4px',
                  color: '#fff',
                  margin: '0px 10px',
                  // fontSize: 12,
                  width: 26,
                  height: 'auto',
                }}
                fontSize="small"
                onClick={() => onAddFill()}
              />
            </IconButton>
          )}
        </Stack>
        <Stack direction="row" sx={{ alignItems: 'center', flexDirection: ' center', marginLeft: 'auto' }}>
          <Divider orientation="vertical" sx={{ mr: 1, ml: 1 }} flexItem />
          <MHidden width="mdDown">
            <Button
              size="small"
              sx={{
                backgroundColor: 'white',
                marginRight: '15px',
                color: '#4F4F4F',
                fontSize: 12,
                fontFamily: 'inter',
                mr: '-4px',
              }}
              disabled={!isActive}
              onClick={() => handleBtNew()}
            >
              + New
            </Button>
            <Switch checked={isActive} onChange={onTgActive} color="secondary" sx={{ mr: '-4px' }} />
          </MHidden>
          <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)} disabled={!isActive}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Paper>
      <Box
        component="div"
        onClick={() => onBtRelation()}
        sx={{
          ml: 2,
          fontWeight: '700',
          color: '#828282',
          textTransform: 'uppercase',
          cursor: 'pointer',
          opacity: relation === 'AND' ? 0 : 1,
          transition: '0.3s ease-in-out',
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        <span>{relation}</span>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'action-menu',
        }}
      >
        <MHidden width="mdUp">
          <MenuItem>
            <Button
              size="small"
              sx={{
                backgroundColor: 'white',
                marginRight: '15px',
                color: '#4F4F4F',
                fontSize: 12,
                fontFamily: 'inter',
                mr: '-4px',
              }}
              disabled={!isActive}
              onClick={() => handleBtNew()}
            >
              + New
            </Button>
          </MenuItem>
          <MenuItem>
            <Switch checked={isActive} onChange={onTgActive} color="secondary" sx={{ mr: '-4px' }} />
          </MenuItem>
        </MHidden>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            handleBtCopy();
          }}
        >
          <ContentCopyIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
          Copy
        </MenuItem>
        {filterPanelList?.length > 1 && (
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              handleBtDelete();
            }}
          >
            <DeleteForeverOutlinedIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} />
            Delete
          </MenuItem>
        )}
      </Menu>
    </>
    // </Grid>
    // </Grid>
  );
}
