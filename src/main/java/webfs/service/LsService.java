package webfs.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import webfs.model.FileProxy;

@Controller
@RequestMapping(value = "/ls")
public class LsService {
	private String basePath = "/";
	
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
					FileProxy fileProxy = new FileProxy(file);
					proxy.add(fileProxy);
				}
			}
			
			return proxy;
		}
		
		return null;
	}

}
