'use client';
import { CardActions, CardContent, List, ListItem } from '@mui/material';
import { Box, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
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

const Timeline = () => {
  const [expanded, setExpanded] = useState('');
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        margin: 8,
      }}
    >
      <VerticalTimeline animate={true} lineColor='#00e0f3'>
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
                  height={110}
                  style={{ display: 'inline-grid' }}
                />
                <Typography
                  gutterBottom
                  className='text-gray-700 dark:text-gray-200'
                  variant='h5'
                  component='div'
                  style={{
                    fontSize: '1.3em',
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
                    fontSize: '15px',
                  }}
                >
                  {item.company}
                </CustomLink>
              </CardActions>
              {item?.description?.responsibilities && (
                <Accordion
                  className='accordian'
                  expanded={expanded === `${item.date}-responsibilities`}
                  onChange={(e, expanded) =>
                    expanded
                      ? setExpanded(`${item.date}-responsibilities`)
                      : setExpanded('')
                  }
                >
                  <AccordionSummary
                    className='accordion-summary'
                    expandIcon={<IoArrowDownOutline />}
                    aria-controls='panel2-content'
                    id='panel2-header'
                  >
                    Responsibilities
                  </AccordionSummary>
                  <AccordionDetails className='accordion-details'>
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
                  </AccordionDetails>
                </Accordion>
              )}
              {item?.description?.accomplishments &&
                Array.isArray(item?.description?.accomplishments) && (
                  <Accordion
                    className='accordion'
                    expanded={expanded === `${item.date}-accomplishments`}
                    onChange={(e, expanded) =>
                      expanded
                        ? setExpanded(`${item.date}-accomplishments`)
                        : setExpanded('')
                    }
                  >
                    <AccordionSummary
                      className='accordion-summary'
                      expandIcon={<IoArrowDownOutline />}
                      aria-controls='panel2-content'
                      id='panel2-header'
                    >
                      Accomplishments
                    </AccordionSummary>
                    <AccordionDetails>
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
                    </AccordionDetails>
                  </Accordion>
                )}
            </VerticalTimelineElement>
          </>
        ))}
        <VerticalTimelineElement
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
          date='1990-10-03'
          iconStyle={{
            backgroundImage:
              'linear-gradient(to top, #00ff94, #00e0f3, #00c4fd)',
          }}
          icon={<MdWork />}
          intersectionObserverProps={{ triggerOnce: false }}
        >
          {/* <Box sx={{ margin: 10 }}> */}
          <Typography
            gutterBottom
            className='text-gray-700 dark:text-gray-200'
            variant='h5'
            component='div'
            style={{
              fontSize: '1.3em',
              fontWeight: 'bold',
              background: theme === 'light' ? '#00e0f3' : '#ffffff',
              color: theme === 'light' ? '#ffffff' : '#00e0f3',
              padding: 10,
            }}
          >
            The spaceship that was carrying me as a baby crash-landed on earth.
          </Typography>
          {/* </Box> */}
        </VerticalTimelineElement>
      </VerticalTimeline>
    </Box>
  );
};

export default Timeline;
