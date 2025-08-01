"use client";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MemoriesImages } from './MemoriesImages';
import { getImagemMemorial } from '@/utils/texts';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box width={'100%'} bgcolor={'#FDFAF6'} sx={{ 
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignContent: 'center',
          alignItems: 'center',
          paddingBottom: 5
        }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

interface DetailsTabProps {
  fotos_memorial: string[],
  historia: string | undefined,
  id: string
}

export const DetailsTab: React.FC<DetailsTabProps> = ({ fotos_memorial, historia, id }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static" sx={{ marginBottom: 5 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Memórias" {...a11yProps(0)} sx={{ color: 'black' }}/>
          <Tab label="História" {...a11yProps(1)} sx={{ color: 'black' }}/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <MemoriesImages id={id} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Typography sx={{paddingX: 5}}>
          { historia }
        </Typography>
      </TabPanel>
    </Box>
  );
}
