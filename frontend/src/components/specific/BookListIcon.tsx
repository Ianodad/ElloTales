import { Box, IconButton, Badge } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

interface BookListIconProps {
  toggleSidebar: () => void;
  readingListNewCacheCount: number;
}
export const BookListIcon = ({
  toggleSidebar,
  readingListNewCacheCount,
}: BookListIconProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '16px',
        backgroundColor: 'primary.main',
        width: '60px',
        height: '60px',
        marginLeft: '12px',
        border: '3px solid black',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'white',
          border: '2.8px solid black',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
          transition: 'background-color 0.2s, box-shadow 0.2s',
        },
        '&:hover .bookListButton': {
          color: 'primary.main',
          fontSize: '38px',
          transition: 'color 0.2s, font-size 0.2s',
        },
      }}
    >
      <IconButton
        className="bookListButton"
        onClick={() => toggleSidebar()}
        sx={{
          fontSize: '34px',
          width: '20px',
          color: 'primary.contrastText',
        }}
      >
        <AutoStoriesIcon fontSize="inherit" />
      </IconButton>
      <Badge
        badgeContent={readingListNewCacheCount}
        color="secondary"
        sx={{
          position: 'absolute',
          top: 4,
          right: 4,
        }}
      ></Badge>
    </Box>
  );
};
