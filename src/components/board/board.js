import React, { useState } from 'react';
import { range } from 'lodash';
import Room from '@material-ui/icons/Room';
import Header from '../Header/header';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import createGraphFromBoard from '../../algorithms/createGraph';
import bfs from '../../algorithms/bfs';
import dijkstra from '../../algorithms/dijkstra';
import './board.scss';


function Board({height = 800, width = 600}) {
  let rows = Math.floor(height / 25);
  let cols = Math.floor(width / 25);
  let source = (Math.floor(rows / 2) * cols) + Math.floor(cols / 5) + 1;
  let target = (Math.floor(rows / 2) * cols) + Math.floor(cols / 5) * 4 + 1;

  const [isDragging, setIsDragging] = useState(false);
  const [walls, setWalls] = useState({});
  function clearPaths() {
    var nodes = document.getElementsByClassName("path");
    while (nodes.length) {
      nodes[0].classList.remove("path");
    }
    nodes = document.getElementsByClassName("visited");
    while (nodes.length) {
      nodes[0].classList.remove("visited");
    }
  }
  function visualize(visited, path) {
    clearPaths();
    for(let i = 0; i < visited.length; i++) {
      let edge = visited[i];
      setTimeout(() => {
        let elem = document.getElementById("" + edge)
        if (elem) {
          document.getElementById("" + edge).classList.add('visited');
        }
      }, i * 10);
      if (i === visited.length - 1) {
        setTimeout(() => {
          drawPath(path);
        }, i * 10);
      }
    }
  }
  function drawPath(path) {
    for(let i = 0; i < path.length; i++) {
      let edge = path[i];
      setTimeout(() => {
        document.getElementById("" + edge).classList.add('path');
      }, i * 10);
    }
  }
  function run() {
    let graph = createGraphFromBoard(cols, rows, walls);
    console.log(graph);
    let result = dijkstra(graph, source, target);
    console.log(result);
    visualize(result.visitedInOrder, result.shortestPath);
  }
  function renderBoard() {
    console.log("rendering board...")
    return range(0, rows).map((r) => {
      return (
        <tr>
          {
            range(0, cols).map((c) => {
              let key = (r * cols) + c + 1;

              let isSource = key === source;
              let isTarget = key === target;
              
              return (
                <td 
                  id={key}
                  className={(walls[key] ? 'board-cell wall' : 'board-cell')}
                  onClick = {
                    () => {
                      console.log('hell');
                      clearPaths();
                      const wallsUpdated = {...walls};
                      wallsUpdated[key] = !wallsUpdated[key];
                      setWalls(wallsUpdated);
                    }
                  }
                  onMouseDown = {
                    () => {
                      clearPaths();
                      setIsDragging(true);
                    }
                  }
                  onMouseEnter = {
                    () => {
                      if (isDragging && !isSource && !isTarget) {
                        
                        const wallsUpdated = {...walls};
                        wallsUpdated[key] = !wallsUpdated[key];
                        setWalls(wallsUpdated);
                      }
                    }
                  }
                  onMouseUp = {
                    () => {
                      setIsDragging(false);
                    }
                  }
                >
                    {
                      isSource
                        ? <Room fontSize='small'/> 
                        : isTarget
                          ? <RadioButtonCheckedIcon fontSize='small'/>
                          : null
                    }
                </td>
              )
            })
          }
        </tr>
      )
    })
  }

  return (
    <div className="board">
      <Header run={run}/>
      <table>
        <tbody>
          {
            renderBoard()
          }
        </tbody>
      </table>
    </div>
  )
}

export default Board;
