import { useState, useEffect } from 'react';
import { Typography, IconButton, Button, Chip, Box, Divider } from '@mui/material';
import { Icon } from '@iconify/react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import editOutline from '@iconify/icons-eva/edit-outline';
import useAuth from 'hooks/useAuth';
import FormScreenerScan from './FormScreenerScan';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileCopyIcon from '@mui/icons-material/FileCopy';

function countWords(str) {
  str = str?.replace(/(^\s*)|(\s*$)/gi, '');
  str = str?.replace(/[ ]{2,}/gi, ' ');
  str = str?.replace(/\n /, '\n');
  return str?.split(' ').length;
}

function ScreenerTitleAndDesc(props) {
  const { classes, editFlag, setEditFlag, formik } = props;
  const { isAuthenticated } = useAuth();

  const [collapse, setCollapse] = useState(true);
  const [readView, triggerReadView] = useState(false);

  const { selectedScreener } = useSelector(({ screenerReducer }) => screenerReducer);

  useEffect(() => {
    const count = countWords(selectedScreener?.description);
    if (count > 500) {
      triggerReadView(true);
    }
  }, [selectedScreener?.description]);

  const checkCanEdit = () => {
    let canEdit = false;
    if (isAuthenticated) {
      if (_.isEmpty(selectedScreener) || selectedScreener?.userId === localStorage.getItem('user_id')) {
        canEdit = true;
      }
    }

    return canEdit;
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          justifyContent: 'space-between',
          marginBottom: '30px',
          marginTop: '30px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '5px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              // marginBottom: '-50px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column-reverse',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '22px', sm: '25px', md: '30px' },
                  color: '#333333',
                  fontWeight: 600,

                  mb: 1,
                }}
              >
                {!editFlag && <span>{selectedScreener?.screenerName || 'Stock Screener'}</span>}
              </Typography>
              {/* {titleEditFlag && (
            <>
              <IconButton size="small" onClick={cancelTitleEdit}>
                <Icon icon={closeOutline} />
              </IconButton>
              <IconButton size="small" onClick={saveTitle}>
                <Icon icon={checkOutline} />
              </IconButton>
            </>
          )} */}
              <Box>
                {!editFlag && !_.isEmpty(selectedScreener) && selectedScreener?.scanCategory && (
                  <Chip
                    label={selectedScreener?.scanCategory}
                    variant="outlined"
                    size="small"
                    sx={{ fontSize: '10px', ml: 1, marginBottom: '20px' }}
                  />
                )}
                {!editFlag && checkCanEdit() && (
                  <IconButton
                    size="small"
                    onClick={() => setEditFlag((flag) => !flag)}
                    sx={{ ml: 2, marginBottom: '20px' }}
                  >
                    <Icon icon={editOutline} />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: '15px',
                marginLeft: '10px',
                marginBottom: { xs: '0px', sm: '0px', md: '-40px', lg: '-25px' },
              }}
            >
              {new Date().toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Typography
              sx={{
                fontSize: { xs: '5px', sm: '10px', md: '14px', lg: '14px' },
                color: '#5C5C5C',
                display: 'flex',
                alignItems: 'center',
                marginRight: '15px',
                flexDirection: { xs: 'column', sm: 'row', md: 'row', lg: 'row' },
              }}
            >
              <FileCopyIcon sx={{ fontSize: { xs: '10px', sm: '10px', md: '20px', lg: '20px' }, marginRight: '5px' }} />
              {0} Clone
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '5px', sm: '10px', md: '14px', lg: '14px' },
                color: '#5C5C5C',
                display: 'flex',
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row', md: 'row', lg: 'row' },
                marginRight: '15px',
              }}
            >
              <VisibilityIcon
                sx={{ fontSize: { xs: '10px', sm: '10px', md: '14px', lg: '14px' }, marginRight: '5px' }}
              />{' '}
              {1000} Views
            </Typography>

            <Typography
              sx={{
                color: '#5C5C5C',
                fontSize: { xs: '5px', sm: '10px', md: '14px', lg: '14px' },
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row', md: 'row', lg: 'row' },
                alignItems: 'center',
                marginRight: '15px',
              }}
            >
              <ModeCommentIcon
                sx={{ fontSize: { xs: '10px', sm: '10px', md: '14px', lg: '14px' }, marginRight: '5px' }}
              />
              {10} Comment
            </Typography>
            <Button
              style={{
                borderRadius: '2px',
                backgroundColor: '#0065CC',
                color: 'white',
                fontWeight: 'lighter',
                fontSize: { xs: '10px', sm: '10px', md: '20px', lg: '20px' },
                display: { sm: 'block', xs: 'block', lg: 'none', md: 'none' },
              }}
              // onClick={}
            >
              <FavoriteIcon sx={{ fontSize: { xs: '15px', sm: '15px', md: '20px', lg: '20px' }, marginRight: '5px' }} />{' '}
              Like | {200}
            </Button>
          </Box>
        </Box>
        <Divider style={{ width: '100%' }} />
      </Box>

      <div style={{ position: 'relative', marginBottom: '10px' }}>
        {!editFlag && _.isEmpty(selectedScreener?.description) && checkCanEdit() && (
          <span className={classes.desBtn} onClick={() => setEditFlag(true)}>
            Add Description
          </span>
        )}
        {editFlag && checkCanEdit() && (
          <Box as="div" fullWidth sx={{ width: '100%', pr: 2, mt: 1 }}>
            <FormScreenerScan setEditFlag={setEditFlag} formik={formik} />
          </Box>
        )}
        {!editFlag && !_.isEmpty(selectedScreener?.description) && (
          <>
            <div className={classes.descriptionRoot}>
              <Typography
                sx={{
                  fontSize: { xs: '12px', sm: '12px', md: '14px' },
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {selectedScreener?.description && (
                  <div
                    style={collapse ? { height: '100px', overflow: 'hidden' } : { minHeight: '100px' }}
                    dangerouslySetInnerHTML={{ __html: selectedScreener?.description }}
                  />
                )}
              </Typography>
            </div>
            {readView && (
              <div
                style={{
                  textAlign: 'center',
                  bottom: collapse && '-5px',
                  position: 'absolute',
                  width: '100%',
                  marginTop: !collapse && '-15px',
                  backgroundColor: collapse && '#ffffffa8',
                }}
              >
                <Button variant="text" fullWidth onClick={() => setCollapse(!collapse)}>
                  {collapse ? 'Read more' : 'Read Less'}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ScreenerTitleAndDesc;
