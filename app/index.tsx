import { Stack, Link, Redirect } from 'expo-router';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import WelcomeScreen from './welcome';
export default function Home() {
  return (
    <Redirect href="/welcome" />
    // <>
    //   <Stack.Screen options={{ title: 'Home' }} />
    //   <Container>
    //     <ScreenContent path="app/index.tsx" title="Home" />
    //     <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
    //       <Button title="Show Details" />
    //     </Link>
    //   </Container>
    // </>
  );
}
