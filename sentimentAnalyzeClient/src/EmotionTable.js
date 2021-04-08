import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    emotionDataRenderer() {
        const data = this.props.emotions;
        return Object.keys(data).map(function(emo) {
            return <tr><td>{emo}</td><td>{data[emo]}</td></tr>
        })
    }

    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
                this.emotionDataRenderer()
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
