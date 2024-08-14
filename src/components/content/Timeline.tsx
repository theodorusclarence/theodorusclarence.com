'use client';
import { CardActions, CardContent, List, ListItem } from '@mui/material';
import { Box, Typography } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import { IoArrowDownOutline } from 'react-icons/io5';
import { MdWork } from 'react-icons/md';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

import 'react-vertical-timeline-component/style.min.css';

import data from './data.json';
import CustomLink from '../links/CustomLink';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} rounded {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 2,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <IoArrowDownOutline
      // sx={{ fontSize: '0.9rem' }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(-90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
    marginTop: '0.2px',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Timeline = () => {
  const [expanded, setExpanded] = useState('');
  const { theme } = useTheme();

  const handleChange = (panel: any) => (event: any, newExpanded: string) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Box
      sx={{
        margin: 8,
      }}
    >
      <VerticalTimeline
        animate={true}
        lineColor={theme === 'light' ? '#00e0f3' : 'white'}
      >
        {data.map((item, index) => (
          <>
            <VerticalTimelineElement
              key={index}
              className='vertical-timeline-element--work text-gray-700 dark:text-gray-200'
              contentStyle={{
                background: theme === 'light' ? '#00e0f3' : '#ffffff',
                color: theme === 'light' ? '#0e1111' : '#ffffff',
                marginTop: '1px',
                padding: '1px',
                border: '2px solid #00e0f3',
                boxShadow: 'none',
              }}
              contentArrowStyle={{
                borderRight: '10px solid',
                color: '#00e0f3',
              }}
              date={item.date}
              iconStyle={{
                backgroundImage:
                  'linear-gradient(to top, #00ff94, #00e0f3, #00c4fd)',
              }}
              icon={<MdWork />}
              intersectionObserverProps={{ triggerOnce: false }}
            >
              <CardContent>
                <Image
                  src={item?.imageSrc}
                  width={100}
                  alt='Guild logo'
                  height={150}
                  style={{ display: 'inline-grid' }}
                />
                <Typography
                  gutterBottom
                  className='text-gray-700 dark:text-gray-200'
                  variant='h5'
                  component='div'
                  style={{
                    marginTop: '1.2' + 'em',
                    fontSize: '1.0em',
                    fontWeight: 'bold',
                    color: theme === 'light' ? '#ffffff' : '#00e0f3',
                  }}
                >
                  {item.title}
                </Typography>
              </CardContent>
              <CardActions>
                <CustomLink
                  href={item.link}
                  style={{
                    marginLeft: '1' + 'em',
                    fontSize: '12px',
                  }}
                >
                  {item.company}
                </CustomLink>
                {/* <Link color="#6b34a6" href={item.link} variant="body2">
                      <span
                        style={{
                          marginLeft: '1' + 'em',
                          fontSize: '11px',
                        }}
                      >
                        {item.link}
                      </span>
                    </Link> */}
              </CardActions>
              {item?.description?.responsibilities && (
                <Accordion
                  expanded={expanded === `${item.date}-responsibilities`}
                  onChange={handleChange(`${item.date}-responsibilities`)}
                >
                  <AccordionSummary
                    aria-controls='panel1d-content'
                    id='panel1d-header'
                  >
                    <Typography
                      style={{
                        fontSize: '0.9em',
                        fontWeight: 'bold',
                      }}
                    >
                      Responsibilities
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      style={{
                        fontSize: '0.9em',
                      }}
                    >
                      <List
                        dense={true}
                        sx={{ listStyleType: 'disc', marginLeft: 1, pl: 2 }}
                      >
                        {item?.description?.responsibilities.map(
                          (line, index) => (
                            <ListItem
                              sx={{ display: 'list-item', marginLeft: 0 }}
                              key={index}
                            >
                              {line}
                            </ListItem>
                          )
                        )}
                      </List>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              )}
              {item?.description?.accomplishments &&
                Array.isArray(item?.description?.accomplishments) && (
                  <Accordion
                    expanded={expanded === `${item.date}-accomplishments`}
                    onChange={handleChange(`${item.date}-accomplishments`)}
                  >
                    <AccordionSummary
                      aria-controls='panel2d-content'
                      id='panel2d-header'
                    >
                      <Typography
                        style={{
                          fontSize: '0.9em',
                          fontWeight: 'bold',
                        }}
                      >
                        Accomplishments
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        style={{
                          fontSize: '0.9em',
                        }}
                      >
                        <List
                          dense={true}
                          sx={{ listStyleType: 'disc', marginLeft: 1, pl: 2 }}
                        >
                          {item?.description?.accomplishments.map(
                            (line, index) => (
                              <ListItem
                                disableGutters
                                sx={{ display: 'list-item', marginLeft: 0 }}
                                key={index}
                              >
                                {line}
                              </ListItem>
                            )
                          )}
                        </List>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                )}
            </VerticalTimelineElement>
          </>
        ))}
        <VerticalTimelineElement
          className='vertical-timeline-element--work text-gray-700 dark:text-gray-200'
          contentStyle={{
            // background: 'rgb(33, 150, 243)',
            // color: '#0e1111',
            marginTop: '1px',
            padding: '1px',
            border: '2px solid grey',
            boxShadow: 'none',
          }}
          contentArrowStyle={{
            borderRight: '10px solid',
            color: '#00e0f3',
          }}
          date='1990-10-03'
          iconStyle={{
            backgroundImage:
              'linear-gradient(to top, #00ff94, #00e0f3, #00c4fd)',
          }}
          icon={<MdWork />}
          intersectionObserverProps={{ triggerOnce: false }}
        >
          <Box
            // className="dark:bg-white bg-dark"
            sx={{ margin: 10 }}
          ></Box>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </Box>
  );
};

export default Timeline;
