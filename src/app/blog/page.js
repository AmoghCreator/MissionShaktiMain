'use client';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  Typography,
  Container,
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  Divider,
  Box,
} from '@mui/material';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopNav from '@/components/TopNav';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

const BlogPage = () => {
  // Initial custom blogs
  const customBlogs = [
    {
      id: '1',
      title: 'Empowering Women Through Mission Shakti',
      description:
        "Mission Shakti has revolutionized the way women in Odisha perceive themselves and their role in society. Since its inception, the program has aimed to empower women by promoting financial independence, leadership, and community participation. Central to this initiative are the thousands of self-help groups (SHGs) established across rural and urban areas. These groups serve as hubs of collective decision-making and mutual support.\n\nOne of the program's flagship achievements is its focus on micro-finance. By providing women with access to low-interest loans, Mission Shakti enables them to start small businesses, expand existing ventures, or invest in their children’s education. For example, Saraswati Mishra from a small village in Khurda district started a tailoring business with a loan of Rs. 20,000. Within two years, she not only repaid the loan but also employed five other women from her community.\n\nThe impact of Mission Shakti goes beyond economic empowerment. It fosters leadership qualities among women by involving them in local governance and community decision-making. Many SHG members have been elected as panchayat leaders, breaking traditional gender barriers.\n\nSkill development workshops are another critical aspect of the program. From handicrafts and agriculture to digital literacy, these workshops equip women with the skills needed to thrive in a competitive world. According to recent statistics, over 6 million women have been trained under Mission Shakti, with 75% reporting an increase in income.\n\nMission Shakti is not just a program—it is a movement. It showcases how empowering women can lead to transformative changes in families, communities, and the broader socio-economic fabric of a state. As Odisha celebrates the success of this initiative, it serves as a model for other states to replicate and adapt.",
      category: 'Empowerment',
      author: 'Ananya Das',
    },
    {
      id: '2',
      title: 'The Role of Self-Help Groups in Mission Shakti',
      description:
        'Self-help groups (SHGs) are the backbone of Mission Shakti, driving grassroots-level change and fostering collective empowerment among women. These groups operate on the principles of shared responsibility, financial inclusion, and mutual support, making them a powerful force for social and economic transformation.\n\nEach SHG typically comprises 10–20 women who come together to pool their savings and provide loans to members in need. This system not only promotes financial independence but also creates a sense of solidarity. For instance, the Maa Durga SHG in Ganjam district began with a savings pool of Rs. 10,000 and has since facilitated over Rs. 2 lakh in loans for its members. These loans have funded small businesses, agricultural ventures, and even emergency healthcare needs.\n\nMission Shakti supports these groups by providing access to government schemes, financial literacy training, and market linkages. Through partnerships with banks, SHGs can avail larger loans at subsidized interest rates. As of 2023, over 7 lakh SHGs in Odisha have been linked to banks, mobilizing more than Rs. 10,000 crore in credit.\n\nBeyond financial benefits, SHGs play a pivotal role in community development. They are involved in activities like organizing health camps, promoting education, and addressing social issues like child marriage and domestic violence. For example, the Annapurna SHG in Mayurbhanj district spearheaded a campaign to improve sanitation facilities in their village, resulting in the construction of 50 new toilets.\n\nSHGs also empower women politically. Many members have gone on to hold positions in local governance, bringing women’s perspectives to the forefront of decision-making. This dual empowerment—economic and political—has transformed the social fabric of rural Odisha.\n\nIn conclusion, SHGs under Mission Shakti are not just financial entities; they are agents of change. They demonstrate the power of collective action and the remarkable potential of women when given the tools and opportunities to succeed.',
      category: 'Community',
      author: 'Rakesh Mohanty',
    },
    {
      id: '3',
      title: 'Skill Development Initiatives Under Mission Shakti',
      description:
        'Skill development is one of the cornerstones of Mission Shakti, focusing on equipping women with the tools they need to achieve financial independence and social mobility. These initiatives are tailored to the unique needs and aspirations of women across Odisha, ensuring inclusivity and impact.\n\nThe program offers training in diverse fields, including traditional crafts like weaving and pottery, modern skills like digital literacy and bookkeeping, and technical trades like electrical repair and carpentry. For example, the training center in Sundargarh district has trained over 500 women in handloom weaving, enabling them to revive traditional Odia designs and cater to urban markets. Similarly, digital literacy programs have empowered thousands of women to use smartphones, manage online transactions, and explore e-commerce opportunities.\n\nMission Shakti’s skill development programs also emphasize entrepreneurship. Women are taught not only technical skills but also business management, marketing, and customer engagement. One success story is that of Kamala Behera from Cuttack, who attended a Mission Shakti workshop on food processing. She started her own pickle-making business, which now supplies products to major retail chains in the state.\n\nCollaboration with private sector partners has further enhanced the impact of these initiatives. Companies like Tata Steel and Infosys have partnered with Mission Shakti to provide advanced training and employment opportunities. According to a 2022 report, over 3 lakh women have secured jobs or started businesses as a direct result of Mission Shakti’s skill development programs.\n\nThe ripple effects of these initiatives are evident in the improved living standards of participating families. Women who once struggled to make ends meet are now contributing significantly to household income and savings. Moreover, the confidence and self-esteem gained through these programs have inspired many women to take on leadership roles in their communities.\n\nSkill development under Mission Shakti is more than just training—it is a pathway to empowerment. It bridges the gap between potential and opportunity, enabling women to dream big and achieve even bigger.',
      category: 'Skill Development',
      author: 'Sukanya Rao',
    },
  ];

  const [blogs, setBlogs] = useState([...customBlogs]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    description: '',
    category: '',
    author: '',
    content: '',
  });

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    setIsAdmin(!!adminToken);
  }, []);

  const handleCreateBlog = async () => {
    try {
      // Append new blog to the list
      setBlogs([...blogs, {...newBlog, id: `${blogs.length + 1}`}]);
      toast.success('Blog created successfully');
      setNewBlog({
        title: '',
        description: '',
        category: '',
        author: '',
        content: '',
      });
    } catch (error) {
      toast.error('Failed to create blog. Please try again later.');
    }
  };

  return (
    <>
      <TopNav />
      <NavigationBar />
      <Container sx={{mt: 4, mb: 4}}>
        <Typography
          variant="h4"
          sx={{fontWeight: 'bold', color: '#2e7d32', mb: 4}}
          align="center"
        >
          Mission Shakti Blogs
        </Typography>

        {/* Blog List */}
        <Box sx={{overflowX: 'auto', display: 'flex', gap: 2, mb: 4, p: 1}}>
          {blogs.map(blog => (
            <Card
              key={blog.id}
              sx={{
                minWidth: '250px',
                maxWidth: '300px',
                flexShrink: 0,
                boxShadow: 3,
                p: 2,
                cursor: 'pointer',
                '&:hover': {boxShadow: 6},
              }}
              onClick={() => setSelectedBlog(blog)}
            >
              <CardContent>
                <Typography variant="h6" sx={{fontWeight: 'bold', mb: 1}}>
                  {blog.title}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                  {blog.description.substr(0, 80)}...
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Selected Blog Details */}
        {selectedBlog && (
          <Card sx={{p: 4, boxShadow: 3, mb: 4}}>
            <Typography
              variant="h4"
              sx={{fontWeight: 'bold', color: '#2e7d32', mb: 2}}
            >
              {selectedBlog.title}
            </Typography>
            <Typography variant="body1" sx={{mb: 3}}>
              {selectedBlog.description}
            </Typography>
            <Divider sx={{my: 2}} />
            <Typography variant="body2" sx={{color: 'text.secondary'}}>
              Category: {selectedBlog.category}
            </Typography>
            <Typography variant="body2" sx={{color: 'text.secondary'}}>
              Author: {selectedBlog.author}
            </Typography>
          </Card>
        )}

        {/* Admin Create Blog */}
        {isAdmin && (
          <Card sx={{p: 4, boxShadow: 3, mt: 4}}>
            <Typography variant="h5" sx={{fontWeight: 'bold', mb: 2}}>
              Create New Blog
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  value={newBlog.title}
                  onChange={e =>
                    setNewBlog({...newBlog, title: e.target.value})
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  value={newBlog.description}
                  onChange={e =>
                    setNewBlog({...newBlog, description: e.target.value})
                  }
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Content"
                  value={newBlog.content}
                  onChange={e =>
                    setNewBlog({...newBlog, content: e.target.value})
                  }
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Category"
                  value={newBlog.category}
                  onChange={e =>
                    setNewBlog({...newBlog, category: e.target.value})
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Author"
                  value={newBlog.author}
                  onChange={e =>
                    setNewBlog({...newBlog, author: e.target.value})
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{backgroundColor: '#2e7d32', color: '#fff'}}
                  onClick={handleCreateBlog}
                >
                  Publish Blog
                </Button>
              </Grid>
            </Grid>
          </Card>
        )}
      </Container>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default BlogPage;
