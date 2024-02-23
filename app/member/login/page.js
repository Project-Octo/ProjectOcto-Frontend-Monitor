'use client';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider, Box } from '@mui/material';
// components
import LoginForm from '@/app/components/login/LoginForm';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')`
	background-color: white;
	display: flex;
`;

const StyledLeftSection = styled('div')(({ theme }) => ({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	backgroundImage: `url('/ocean_login.jpeg')`,
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	textAlign: 'center',
}));

const StyledContent = styled('div')(({ theme }) => ({
	maxWidth: 480,
	margin: 'auto',
	minHeight: '100vh',
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	textAlign: 'center',
}));

// ----------------------------------------------------------------------

export default function Index() {
	return (
		<>
			<StyledRoot>
				<StyledLeftSection>
					<Typography
						variant="h1"
						fontWeight={'bold'}
						sx={{ px: 5, mt: 10 }}
						color={'white'}
					>
						OCTO
					</Typography>
				</StyledLeftSection>

				<Container maxWidth="sm">
					<StyledContent>
						<Typography variant="h1" color={'black'}>
							LOGO
						</Typography>

						<Divider sx={{ my: 3 }} />

						<LoginForm />
					</StyledContent>
				</Container>
			</StyledRoot>
		</>
	);
}
