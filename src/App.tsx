import IpButton from './components/IpButton';
import Notifier, { NotifierMessage } from './components/Notifier';

const message: NotifierMessage = (
    <div>
        This is a test message.<br/>
        It contains a new line and a <a href="https://www.google.de/">Hyperlink</a>
    </div>
);

function App() {
    return (
        <div>
            <IpButton caption="Unknown" />
            <Notifier caption={message}/>
        </div>
    );
}

export default App;
