#include <string>
#include <vector>
#include <algorithm>
#include <queue>

using namespace std;

void bfs(int pipe, vector<int>& visited, vector<vector<vector<int>>>& graph) {
    queue<int> q;
    
    for (int i=0; i<visited.size(); i++) {
        if (visited[i]) {
            q.push(i);
        }
    }
    
    while (!q.empty()) {
        int curr_node = q.front();
        q.pop();
        
        for (int i = 0; i < graph[pipe][curr_node].size(); i++) {
            int next_node = graph[pipe][curr_node][i];
            
            if (visited[next_node]) continue;
            
            q.push(next_node);
            visited[next_node] = true;
        }
    }
    
    return;
}

void dfs(int repeat_time, int& k, vector<int> visited, vector<vector<vector<int>>>& graph, int& max_infected_nodes) {
    if (repeat_time == k) {
        int infected_nodes = 0;
        for (int i=0; i<visited.size(); i++) {
            if (visited[i]) {
                infected_nodes++;
            }
        }
        max_infected_nodes = max(infected_nodes, max_infected_nodes);
        return;
    }
    
    for (int pipe=1; pipe<=3; pipe++) {
        vector<int> next_visited = visited;
        bfs(pipe, next_visited, graph);
        dfs(repeat_time + 1, k, next_visited, graph, max_infected_nodes);
    }
}

int solution(int n, int infection, vector<vector<int>> edges, int k) {
    int max_infected_nodes = 0;
    vector<vector<vector<int>>> graph(4, vector<vector<int>>(n+1));
    vector<int> visited(n+1, false);
    
    for (int i = 0; i < edges.size(); i++) {
        graph[edges[i][2]][edges[i][0]].push_back(edges[i][1]);
        graph[edges[i][2]][edges[i][1]].push_back(edges[i][0]);
    }
    
    dfs(0, k, visited, graph, max_infected_nodes);
    
    return max_infected_nodes;
}