"use client";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MemoriesImages from './MemoriesImages';

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

export default function DetailsTab() {
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
        <MemoriesImages />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Typography sx={{paddingX: 5}}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam nesciunt tempore ipsum adipisci corporis ducimus veritatis, temporibus sapiente obcaecati quis voluptate magni. Saepe inventore dolor quas tempore, est obcaecati cum vitae suscipit sapiente optio velit culpa alias repellendus magni praesentium consequatur animi consectetur beatae qui commodi? Nisi eos soluta repellendus numquam praesentium iusto provident et laboriosam velit! Nobis at quidem optio necessitatibus, commodi aperiam molestiae itaque culpa reprehenderit aut, consequatur eligendi temporibus ad voluptate. Qui laborum veritatis dolor ducimus iure, nobis quam excepturi necessitatibus ipsam, corporis laudantium minima. Dignissimos velit laborum perspiciatis pariatur in alias quo molestias facilis possimus deleniti?
        </Typography>

        <Typography sx={{paddingX: 5}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente deserunt, necessitatibus laboriosam quibusdam saepe minima numquam ipsum corrupti beatae in obcaecati ex neque ut repellat facere magni libero. Molestias velit, explicabo nam temporibus odio ab ullam molestiae sit vel optio, minima pariatur magnam cupiditate labore! Tempora est, quibusdam magni architecto at saepe commodi laboriosam! Non repellendus minima, assumenda quibusdam rerum amet ab tenetur eum numquam nesciunt officiis tempore a voluptatibus magnam quis. Maiores incidunt modi voluptas odit perferendis! Consequuntur nisi, facilis error in voluptas praesentium qui quibusdam est, ullam ratione consequatur culpa modi non numquam placeat repudiandae? Harum possimus magnam quidem beatae architecto amet officia, fugiat accusamus laboriosam! Rem veritatis recusandae quae sint tenetur? Esse vel explicabo doloribus consequuntur odio molestiae, dolores repellat?
        </Typography>
      </TabPanel>
    </Box>
  );
}
