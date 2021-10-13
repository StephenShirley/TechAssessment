import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { Colors } from './colors';

class Node {
    color: Colors;
    value: number;
    children: Node[];
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'tech-assessment';

    tree1: Node[] = [{ color: Colors.purple, value: 5, children: [] }];
    tree2: Node[] = [{ color: Colors.purple, value: 5, children: [] }];

    score1 = 5;

    setScore1() {
        setTimeout(() => {
            this.score1 = this.getTreeScore(this.tree1[0]);
        });
    }

    getTreeScore(node: Node): number {
        let value = node.value;
        if (node.children.length) {
            node.children.forEach(child => {
                value += this.getTreeScore(child);
            });
        }

        return value;
    }
}
