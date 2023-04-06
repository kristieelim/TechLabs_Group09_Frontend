import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';




const mainFeaturedPost = {
  title: 'Tafel Route - A Solution to Food Distribution',
  description:
    "Our platform simplifies the food distribution process for non-profit organizations. We provide an easy-to-use interface for restaurants and drivers, enabling them to efficiently donate and collect surplus food for distribution to those in need.",
  image: "https://source.unsplash.com/D6Tu_L3chLE/",
  imageText: '',
  linkText: '',
  imageText: '',
  linkText: '',
};

const featuredPosts = [
  {
    title: 'Restaurant Dashboard',
    date: '',
    description:
      'Our user-friendly restaurant dashboard simplifies the surplus food donation process by allowing restaurants to easily upload and track their donations.',
    image: 'https://source.unsplash.com/RrzeCGujVfU/w=600',
    imageLabel: 'Image Text',
  },
  {
    title: 'Driver Routing System',
    date: '',
    description:
      'We provide drivers with optimized routes and schedules for food pickup, reducing gas and time expenses and ensuring timely delivery to those in need.',
    image: 'https://source.unsplash.com/NeJofwHFC5o/w=600',
    imageLabel: 'Image Text',
  },
];



const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const theme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer
        title=""
        description=""
      />
    </ThemeProvider>
  );
}
