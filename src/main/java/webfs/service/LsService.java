package webfs.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import webfs.model.FileProxy;

@Controller
@RequestMapping(value = "/ls")
public class LsService {
	@Autowired
	private String basePath;
	
	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody List<FileProxy> list(@RequestParam String wpath) {
	
		String path = "";
		if(wpath != null) {
			//TODO: Validade input
			path = wpath;
		}
		
		File directory = new File(basePath + "/" + path);
		if(directory.isDirectory()) {
			List<FileProxy> proxy = new ArrayList<FileProxy>();
			
			File[] files = directory.listFiles();
			if(files != null) {
				for (File file : files) {
				
					FileProxy fileProxy = null;
					
					File data = new File(file.getAbsolutePath() + ".wfs");
					if(!data.exists()) {
						fileProxy = new FileProxy(file);
					} else { 
						try {
							FileReader fr = new FileReader(data);
							BufferedReader br = new BufferedReader(fr);
							
							StringBuffer sb = new StringBuffer();
							
							String line;
							while((line = br.readLine()) != null) {
								sb.append(line);
								sb.append("\n");
							}
							fileProxy = new FileProxy(file, sb.toString());
							
						} catch (IOException e) {
							//TODO: CATCH!
							e.printStackTrace();
						}
					}
					
					proxy.add(fileProxy);
				}
			}
			
			return proxy;
		}
		
		return null;
	}

	public void setBasePath(String basePath) {
		this.basePath = basePath;
	}
}
