import IpButton from './components/IpButton';
import Notifier, { NotifierMessage } from './components/Notifier';

function App() {
    return (
        <div>
            <IpButton caption="Unknown" />
            <Notifier />
        </div>
    );
}

export default App;
