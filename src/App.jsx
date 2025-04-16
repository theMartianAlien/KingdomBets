import HomePage from './pages/HomePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PlayersPage, { loader as getAllPlayersLoader } from './pages/PlayersPage';
import RootPage from './pages/Layout/RootPage';
import BetsPage, { loader as getAllBetsLoader } from './pages/Bets/BetsPage';
import BetsDetailPage, { loader as getBetDetailsLoader } from './pages/Bets/BetsDetailPage';
import NewBetPage, { action as createNewBetAction } from './pages/Bets/NewBetPage';
import EditBetsPage from './pages/Bets/EditBetsPage';
import BetsRootPage from './pages/Bets/BetsRootPage';
import PlayersRootPage from './pages/Players/PlayersRootPage';
import NewPlayerPage, { action as createNewPlayerAction } from './pages/Players/NewPlayerPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'players',
        element: <PlayersRootPage />,
        children: [
          {
            index: true,
            element: <PlayersPage />,
            loader: getAllPlayersLoader,
          },
          {
            path: 'new',
            element: <NewPlayerPage />,
            action: createNewPlayerAction
          }
        ]
      },
      {
        path: 'bets',
        id: 'bets-root',
        element: <BetsRootPage />,
        loader: getAllPlayersLoader,
        children: [
          {
            index: true,
            element: <BetsPage />,
            loader: getAllBetsLoader,
          },
          {
            path: ':betId',
            id: 'bet-detail',
            loader: getBetDetailsLoader,
            children: [
              {
                index: true,
                element: <BetsDetailPage />
              },
              { path: 'edit', element: <EditBetsPage />, action: createNewBetAction },
            ],
          },
          { path: 'new', element: <NewBetPage />, loader: getAllPlayersLoader, action: createNewBetAction }
        ]
      },

    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App

